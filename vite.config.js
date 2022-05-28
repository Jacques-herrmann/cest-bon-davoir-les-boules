import {defineConfig} from 'vite'

export default defineConfig({
	root: 'src',
	resolve: {
		alias: {
			'@': './src',
		},
	},
	publicDir: './static',
	proxy: {
		'/api': {
			target: 'http://localhost:3000',
			changeOrigin: true,
		},
	},
	plugins: [
		{},
	],
})