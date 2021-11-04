import sveltePreprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: vercel(), 
		// hydrate the <div id="svelte"> element in src/app.html
		// paths: {
		// 	base: '/w4bw-demo',
		// 	assets: '/w4bw-demo'
		// },
		target: '#svelte'

	}
};

export default config;
