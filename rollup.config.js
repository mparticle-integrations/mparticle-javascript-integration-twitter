import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: 'src/TwitterEventForwarder.js',
    output: {
        file: 'TwitterEventForwarder.js',
       format: 'umd',
        exports: 'named',
        name: 'mp-twitter-kit',
        strict: false
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs()
    ]
},
{
    input: 'src/TwitterEventForwarder.js',
    output: {
        file: 'dist/TwitterEventForwarder.js',
        format: 'umd',
        exports: 'named',
        name: 'mp-twitter-kit',
        strict: false
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs()
    ]
}
] 