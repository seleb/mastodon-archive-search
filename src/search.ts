import { Search } from 'js-search';
import { nanoid } from 'nanoid';
import { tokenizer } from './tokenizer';
import SearchWorker from './worker?worker';

type Promisify<T extends (...args: never) => unknown> = (
	...args: Parameters<T>
) => Promise<ReturnType<T>>;

const api: {
	setUid: (...args: ConstructorParameters<typeof Search>) => Promise<void>;
	clear: () => Promise<void>;
	addIndex: Promisify<Search['addIndex']>;
	addDocuments: Promisify<Search['addDocuments']>;
	search: Promisify<Search['search']>;
} = {
	setUid() {
		throw new Error('Function not implemented.');
	},
	clear() {
		throw new Error('Function not implemented.');
	},
	addIndex() {
		throw new Error('Function not implemented.');
	},
	addDocuments() {
		throw new Error('Function not implemented.');
	},
	search() {
		throw new Error('Function not implemented.');
	},
};

export type Api = typeof api;

let uid: ConstructorParameters<typeof Search>;
if (window.Worker) {
	const search = new SearchWorker();

	const postAndWaitForReponse = <
		K extends keyof Api,
		P extends Api[K]
	>(message: {
		fn: K;
		data: Parameters<P>;
	}) => {
		const id = nanoid();
		search.postMessage({ id, ...message });
		return new Promise<Awaited<ReturnType<P>>>((r) => {
			const onMessage = (e: MessageEvent) => {
				if (id !== e.data.id) return;
				search.removeEventListener('message', onMessage);
				r(e.data.data);
			};
			search.addEventListener('message', onMessage);
		});
	};

	api.setUid = (...args) =>
		postAndWaitForReponse({ fn: 'setUid', data: (uid = args) });
	api.clear = () => postAndWaitForReponse({ fn: 'setUid', data: uid });
	api.addIndex = (...args) =>
		postAndWaitForReponse({ fn: 'addIndex', data: args });
	api.addDocuments = (...args) =>
		postAndWaitForReponse({ fn: 'addDocuments', data: args });
	api.search = (...args) => postAndWaitForReponse({ fn: 'search', data: args });
} else {
	let search: Search;
	api.setUid = (...args) => {
		search = new Search(...(uid = args));
		search.tokenizer = tokenizer;
		return Promise.resolve();
	};
	api.clear = () => {
		search = new Search(...uid);
		search.tokenizer = tokenizer;
		return Promise.resolve();
	};
	api.addIndex = (...args) => Promise.resolve(search.addIndex(...args));
	api.addDocuments = (...args) => Promise.resolve(search.addDocuments(...args));
	api.search = (...args) => Promise.resolve(search.search(...args));
}

export { api };
