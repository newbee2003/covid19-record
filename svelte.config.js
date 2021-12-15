import static_adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import vitePluginString from 'vite-plugin-string';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ['theme']
		}
	}),
	kit: {
		adapter: static_adapter({ pages: 'build' }),
		vite: defineConfig({
			plugins: [
				vitePluginString.default({
					include: ['**/*.vs', '**/*.fs', '**/*.vert', '**/*.frag', '**/*.glsl', '**/*.md']
				})
			]
		}),
		// paths: {
		// 	base: '/w4bw-demo',
		// 	assets: '/w4bw-demo'
		// },
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
