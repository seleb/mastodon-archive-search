import { error } from './logger';

const preloadEl = document.querySelector('#preloader');
if (!preloadEl) throw new Error('Could not find preloader element');

(async () => {
	const { init } = await import('./Storage');
	await init();
	await (await import('./main')).init();
	preloadEl.remove();
})().catch((err) => {
	error('failed to load', err);
	preloadEl.textContent = `Something went wrong: ${
		err?.message || 'unknown error'
	}`;
});
