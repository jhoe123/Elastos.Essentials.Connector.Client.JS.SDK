//import path from "path";
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
//import analyze from 'rollup-plugin-analyzer';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: './src/index.ts',
	output: [
        {
            sourcemap: true,
            format: 'cjs',
            file: 'dist/index.js'
        },
        {
            sourcemap: true,
            format: 'esm',
            file: 'dist.esm/index.js'
        }
    ],
	external: [
		'@elastosfoundation/elastos-connectivity-sdk-cordova',
		'web3',
		'web3-core'
	],
	plugins: [
		postcss({
            extract: 'bundle.css'
        }),
		json(),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: [''],
			preferBuiltins: true
		}),
		commonjs(),
        typescript({
            sourceMap: true,
            inlineSources: !production
        }),

		// To fix the "exports is not defined" runtime error in browser because some dependencies of
		// wallet connect have code that generates calls to "exports" which doesn't exist in browsers.
		// https://github.com/rollup/rollup/issues/2332
		// https://github.com/microsoft/TypeScript/issues/32934
		replace({
			'Object.defineProperty(exports, "__esModule", { value: true });': '',
			delimiters: ['\n', '\n'],
			preventAssignment: true
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

        /*analyze({
            limit: 10
        })*/
	],
	watch: {
		clearScreen: true
	}
};