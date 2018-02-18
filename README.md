# yagni-dom

Yet another **pure functional** DOM API related frontend library built on top
of [yagni][yagni] library.

**Pure functional** in this context means functional code style - library code is
linted using [eslint-plugin-fp][eslint-plugin-fp] and
[eslint-plugin-better][eslint-plugin-better]. Javascript code of the library is
purely functional.


## Installation

Using `npm`:

```shell

$ npm install --save-dev yagni-dom

```

Using `yarn`:

```shell

$ yarn add -D yagni-dom

```

## Usage

Source code is written using [ES6 modules][es6-modules], built using
[rollup][rollup] and distributed in two formats - as CommonJS module and as
ES6 module.

CommonJS usage:

```javascript

const dom = require('yagni-dom');

```

ES6 module usage:

```javascript

import * as dom from 'yagni-dom';
// or
import { h, hSVG, hToDOM } from 'yagni-dom';

```


## Documentation

Not yet available, please check sources.


## Example

Here is an example of library usage:


```javascript

import { pipe } from 'yagni';
import { h, hToDOM, appendTo, firstChild } from 'yagni-dom';

const doc = window.document;

const appendToBody = pipe([
  hToDOM,
  appendTo(doc.body),
  firstChild
]);

const layout = h('div', {class: 'root'}, {}, [
  h('div', {class: 'header'}, {}, ['Header']),
  h('div', {class: 'main'}, {}, [
    h('div', {class: 'sidebar'}, {}, ['Sidebar']),
    h('div', {class: 'content'}, {}, ['Content'])
  ]),
  h('div', {class: 'footer'}, {}, ['Footer'])
]);

const el = appendToBody(layout);

```

which is an equivalent to the following raw DOM API calls:

```javascript

const doc = window.document;

const root = doc.createElement('div');
const header = doc.createElement('div');
const main = doc.createElement('div');
const sidebar = doc.createElement('div');
const content = doc.createElement('div');
const footer = doc.createElement('div');

root.classList.add('root');
header.classList.add('header');
main.classList.add('main');
sidebar.classList.add('sidebar');
content.classList.add('content');
footer.classList.add('footer');

header.appendChild(doc.createTextNode('Header'));
sidebar.appendChild(doc.createTextNode('Sidebar'));
content.appendChild(doc.createTextNode('Content'));
footer.appendChild(doc.createTextNode('Footer'));

main.appendChild(sidebar);
main.appendChild(content);

root.appendChild(header);
root.appendChild(main);
root.appendChild(footer);

doc.body.appendChild(root);

```

## License

MIT


[eslint-plugin-fp]: https://github.com/jfmengels/eslint-plugin-fp
[eslint-plugin-better]: https://github.com/idmitriev/eslint-plugin-better
[es6-modules]: https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
[yagni]: https://github.com/ysegorov/yagni
[rollup]: https://rollupjs.org/
