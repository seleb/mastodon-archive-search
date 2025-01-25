import { nanoid } from 'nanoid';
import { error } from './logger';
import { OrderedItem, Outbox } from './outbox';
import { measure } from './perf';
import { renderItem } from './renderItem';
import { api as Search } from './search';
import { get, set } from './Storage';
import { tokenizer } from './tokenizer';

// based on https://stackoverflow.com/a/7313467
function caseInsensitiveReplaceAll(
	source: string,
	terms: string[],
	replaceWith: string
) {
	return source.replace(
		new RegExp(
			`(${terms
				.map((i) => i.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
				.join('|')})`,
			'ig'
		),
		replaceWith
	);
}

(async () => {
	const elFileInput =
		document.querySelector<HTMLInputElement>('input[type="file"]');
	const elSearchInput = document.querySelector<HTMLInputElement>(
		'input[type="search"]'
	);
	const elSort = document.querySelector<HTMLSelectElement>('select');
	const elList = document.querySelector<HTMLUListElement>('#results');
	const elStats = document.querySelector<HTMLParagraphElement>('#stats');
	let elCount: HTMLSpanElement | null = null;
	if (!elFileInput || !elSearchInput || !elSort || !elList || !elStats)
		throw new Error('could not find elements');

	await Search.setUid('id');
	const handleOutbox = async (outbox: Outbox) => {
		const measureOutbox = measure('outbox');
		try {
			const data = outbox.orderedItems
				.filter(
					(i) =>
						i.type === 'Create' &&
						typeof i.object !== 'string' &&
						i.object.type === 'Note'
				)
				.map((i) => ({
					...i,
					object: {
						...i.object,
						alt: i.object.attachment.map((i) => i.name).join('|'),
					},
				}));
			if (!data.length)
				throw new Error(
					'could not find any posts, double check that your outbox file is correct'
				);
			const updated = data[data.length - 1]?.object.published || 0;
			elStats.innerHTML = `<span id="count">${data.length}</span> of ${
				data.length
			} posts, latest: <time datatime="${updated}">${new Date(
				updated
			).toDateString()}</time>`;
			elCount = document.querySelector<HTMLSpanElement>('#count');
			await Search.clear();
			await Promise.all([
				Search.addIndex(['object', 'content']),
				Search.addIndex(['object', 'summary']),
				Search.addIndex(['object', 'alt']),
			]);
			await Search.addDocuments(data);
			set('outbox', outbox);
			elSearchInput.value = '';
			await handleSearch();
		} catch (err) {
			let message = 'unknown error';
			if (err instanceof Error) message = err.message;
			error('Failed to load outbox', err);
			elList.innerHTML = `<li class="null error">Failed to load outbox: ${
				message || 'unknown error'
			}</li>`;
		} finally {
			measureOutbox();
		}
	};

	function getTextNodesIn(node: Element, includeWhitespaceNodes: boolean) {
		const textNodes: Text[] = [],
			whitespace = /^\s*$/;

		function getTextNodes(node: Node) {
			if (node.nodeType == 3) {
				if (includeWhitespaceNodes || !whitespace.test(node.nodeValue || '')) {
					textNodes.push(node as Text);
				}
			} else {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					getTextNodes(node.childNodes[i]);
				}
			}
		}

		getTextNodes(node);
		return textNodes;
	}
	const templateDiv = document.createElement('div');
	const enhanceNodes = (
		textNodes: Text[],
		enhance: (text: string) => string
	) => {
		textNodes.forEach((node) => {
			const oldText = node.textContent;
			const newText = enhance(oldText || '');
			if (oldText === newText) return;
			templateDiv.innerHTML = newText;
			node.replaceWith(...Array.from(templateDiv.childNodes));
		});
	};
	const highlight = (source: Element, term: string) => {
		const termTokens = tokenizer.tokenize(term);
		let nodes = getTextNodesIn(source, true);
		enhanceNodes(nodes, (text) =>
			caseInsensitiveReplaceAll(text, [term], `<mark class="exact">$1</mark>`)
		);
		nodes = getTextNodesIn(source, true).filter((i) => i.textContent !== term);
		enhanceNodes(nodes, (text) =>
			caseInsensitiveReplaceAll(text, termTokens, `<mark>$1</mark>`)
		);
	};

	let lastSearch = '';
	const handleSearch = async () => {
		const measureFull = measure('full');
		const thisSearch = (lastSearch = nanoid());
		try {
			const q = elSearchInput.value;
			if (q.length < 1) {
				elList.innerHTML =
					'<li class="null">Search results will be displayed here</li>';
				if (elCount) elCount.textContent = '0';
				return;
			}

			const measureSearch = measure('search');
			elList.classList.add('stale');
			const result = (await Search.search(q)) as OrderedItem[];
			measureSearch();
			if (thisSearch !== lastSearch) return;

			if (!result.length) {
				elList.innerHTML = `<li class="null">No results found for search "${q}"</li>`;
				if (elCount) elCount.textContent = '0';
				return;
			}

			const measureSort = measure('sort');
			const sort = elSort.value;
			if (sort === 'latest first')
				result.sort((a, b) => b.published.localeCompare(a.published));
			else if (sort === 'oldest first')
				result.sort((a, b) => a.published.localeCompare(b.published));
			measureSort();

			// eagerly add up to 50 items
			const rendered = result.slice(0, 50);

			const measureBuild = measure('build');
			const fragment = document.createDocumentFragment();
			rendered.map(renderItem).forEach(fragment.appendChild.bind(fragment));
			measureBuild();

			const measureHighlight = measure('highlight');
			Array.from(fragment.children).forEach((i) => {
				highlight(i, q);
			});
			measureHighlight();

			const measureRender = measure('render');
			elList.replaceChildren(fragment);
			if (elCount) elCount.textContent = result.length.toString(10);
			measureRender();

			// lazily add more items
			const onIdle = () => {
				if (thisSearch !== lastSearch) return;
				const next = result[rendered.length];
				if (!next) return;
				rendered.push(next);
				const el = renderItem(next);
				highlight(el, q);
				elList.appendChild(el);
				requestIdleCallback(onIdle);
			};
			requestIdleCallback(onIdle);
		} catch (err) {
			let message = 'unknown error';
			if (err instanceof Error) message = err.message;
			error('Failed to search', err);
			elList.innerHTML = `<li class="null error">Failed to search: ${
				message || 'unknown error'
			}</li>`;
		} finally {
			elList.classList.remove('stale');
			measureFull();
		}
	};

	const savedOutbox = get('outbox');
	if (savedOutbox) {
		handleOutbox(savedOutbox);
	}

	elFileInput.addEventListener('change', async () => {
		const file = elFileInput.files?.[0];
		if (!file) return;
		const outbox = JSON.parse(await file.text());
		handleOutbox(outbox);
	});
	elSearchInput.addEventListener('input', handleSearch);
	elSort.addEventListener('change', handleSearch);
})();
