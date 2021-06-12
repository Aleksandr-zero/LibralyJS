import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';


export default {
	input: ['./src/js/app.js'],
	plugins: [
		babel ({
			presets: ['@babel/preset-env']
		}),
		terser()
	],
	output: {
		file: './app/js/app.js',
		format: 'es'
	}
}
