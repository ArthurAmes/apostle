import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
