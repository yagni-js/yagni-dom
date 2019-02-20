
import pkg from './package.json';
import { eslint } from 'rollup-plugin-eslint';

const banner = ([
  '/**',
  ' *',
  ' * @module @yagni-js/yagni-dom',
  ' * @version ' + pkg.version,
  ' * @author Yuri Egorov <ysegorov at gmail dot com>',
  ' * @license Unlicense http://unlicense.org',
  ' *',
  ' */',
  ''
]).join('\n');

export default [
  {
    input: 'src/main.js',
    output: [
      {file: pkg.main, format: 'cjs', banner: banner},
      {file: pkg.module, format: 'es', banner: banner}
    ],
    external: [
      '@yagni-js/yagni'
    ],
    plugins: [
      eslint({throwOnError: true})
    ]
  }
];
