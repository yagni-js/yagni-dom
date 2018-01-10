
import pkg from './package.json';
import eslint from 'rollup-plugin-eslint';

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs'},
      {file: pkg.module, format: 'es'}
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
