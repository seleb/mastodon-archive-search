import { Search } from 'js-search';
import { get, set } from './Storage';
import { error } from './logger';
import { OrderedItem, Outbox } from './outbox';
(async () => {
	const elFileInput =
		document.querySelector<HTMLInputElement>('input[type="file"]');
	const elSearchInput =
		document.querySelector<HTMLInputElement>('input[type="text"]');
	const elList = document.querySelector<HTMLUListElement>('#results');
	const elStats = document.querySelector<HTMLParagraphElement>('#stats');
	if (!elFileInput || !elSearchInput || !elList || !elStats)
		throw new Error('could not find elements');

	let search = new Search('id');
	const handleOutbox = (outbox: Outbox) => {
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
			elStats.innerHTML = `${
				data.length
			} posts, latest: <time datatime="${updated}">${new Date(
				updated
			).toDateString()}</time>`;
			search = new Search('id');
			search.addIndex(['object', 'content']);
			search.addIndex(['object', 'summary']);
			search.addIndex(['object', 'alt']);
			search.addDocuments(data);
			set('outbox', outbox);
			elSearchInput.value = '';
			handleSearch('');
		} catch (err) {
			error('Failed to load outbox', err);
			elList.innerHTML = `<li class="null error">Failed to load outbox: ${
				err.message || 'unknown error'
			}</li>`;
		}
	};

	const handleSearch = (q: string) => {
		try {
			Array.from(elList.children).forEach((i) => i.remove());
			if (q.length < 3) {
				elList.innerHTML =
					'<li class="null">Search results will be displayed here</li>';
				return;
			}
			const result = search.search(q) as OrderedItem[];
			if (!result.length) {
				elList.innerHTML = `<li class="null">No results found for search "${q}"</li>`;
				return;
			}
			result.forEach((i) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.title = 'open original';
				a.href = i.object.id;
				a.target = '_blank';
				a.rel = 'noreferrer nofollow noopener';
				li.innerHTML = i.object.content.replaceAll(q, `<mark>${q}</mark>`);
				i.object.attachment.forEach((img) => {
					const elImg = document.createElement('img');
					elImg.alt = img.name || 'Media with no provided descriptive text';
					li.appendChild(elImg);
				});
				if (i.object.summary) {
					const details = document.createElement('details');
					const summary = document.createElement('summary');
					summary.innerHTML = i.object.summary.replaceAll(
						q,
						`<mark>${q}</mark>`
					);
					details.innerHTML = li.innerHTML;
					li.textContent = '';
					details.prepend(summary);
					details.open = true;
					li.appendChild(details);
				}
				const elTime = document.createElement('time');
				elTime.textContent = new Date(i.object.published).toDateString();
				elTime.dateTime = i.object.published;
				a.appendChild(elTime);
				li.prepend(a);
				elList.appendChild(li);
			});
		} catch (err) {
			error('Failed to search', err);
			elList.innerHTML = `<li class="null error">Failed to search: ${
				err.message || 'unknown error'
			}</li>`;
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
	elSearchInput.addEventListener('input', () => {
		handleSearch(elSearchInput.value);
	});
})();