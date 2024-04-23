import localForage from 'localforage';
import pkg from '../package.json';
import { Outbox } from './outbox';

localForage.config({
	name: pkg.name,
	storeName: pkg.name.replace(/^[a-zA-Z0-9_]/g, '_'), // Should be alphanumeric, with underscores.
	description: pkg.description,
});
const storage = localForage;

type State = {
	outbox: null | Outbox;
};
const initialState: State = {
	outbox: null,
};

const internalState: State = {
	outbox: null,
};

export async function init() {
	const saved = await storage.getItem<State>('storage');
	if (saved) {
		internalState.outbox = saved.outbox;
	}
}

export function get<K extends keyof State>(k: K) {
	return internalState[k];
}

export function set<K extends keyof State, V extends State[K]>(k: K, v: V) {
	internalState[k] = v;
	storage.setItem('storage', internalState);
}

export function reset() {
	set('outbox', initialState.outbox);
}
