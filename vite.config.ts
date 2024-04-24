import { Plugin, defineConfig } from 'vite';
import pkg from './package.json';

const htmlReplaceTitlePlugin: Plugin = {
	name: 'transform-html',
	transformIndexHtml: {
		order: 'pre',
		handler(html: string) {
			return html
				.replace('<title>TITLE</title>', `<title>${pkg.name}</title>`)
				.replace('>vVERSION</a>', `>v${pkg.version}</a>`);
		},
	},
};

export default defineConfig({
	base: './',
	build: {
		outDir: './docs',
	},
	server: {
		port: 80,
	},
	plugins: [htmlReplaceTitlePlugin],
});
