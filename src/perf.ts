import { nanoid } from 'nanoid';
import { log } from './logger';

const noop = () => {};

export const measure = import.meta.env.DEV
	? (name: string) => {
		const id = nanoid();
		const start = `${name}-${id}-start`;
		const end = `${name}-${id}-end`;
		const duration = `${name}-${id}-duration`
		performance.mark(start);
		return () => {
			performance.mark(end);
			log(name, performance.measure(duration, start, end).duration);
		};
	  }
	: () => noop;
