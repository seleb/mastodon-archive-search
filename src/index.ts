import { log } from './logger';

const preloadEl = document.querySelector('#preload');
if (!preloadEl) throw new Error('Could not find preload element');
preloadEl.remove();

log('test');
