import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'test/tests.js',
    output: {
        file: 'test/test-bundle.js',
        format: 'iife',
        name: 'mpTwitterTests',
    },
    plugins: [resolve(), commonjs()],
};
