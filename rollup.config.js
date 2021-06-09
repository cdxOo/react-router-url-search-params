import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import packageJSON from './package.json';

export default {
    input: 'src/index.js',
    output: [
        {
            file: packageJSON.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'default',
        },
        {
            file: packageJSON.module,
            format: 'esm',
            sourcemap: true
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs()
    ]
}
