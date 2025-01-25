import { Search } from 'js-search';
import type { Api } from './search';
import { tokenizer } from './tokenizer';

let search: Search;

onmessage = <K extends keyof Api, P extends Api[K]>(
	e: MessageEvent<{ id: string; fn: K; data: Parameters<P> }>
) => {
	const { id, fn, data } = e.data;
	let result = undefined;
	if (fn === 'setUid') {
		search = new Search(...data);
		search.tokenizer = tokenizer;
	} else {
		result = search[fn](...data);
	}
	postMessage({ id: id, data: result });
};
