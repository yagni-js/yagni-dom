
import { always, ifElse, isArray, isString, lazy, pipe, reduce } from '@yagni-js/yagni';

import { setAttrs } from './attrs.js';
import { createElement, createSVGElement, createText } from './create.js';
import { setProps } from './props.js';
import { appendAfter, removeChildren, replace } from './mutate.js';


/**
 * Takes either string to create text node or a function to call to create
 * dom element and returns newly created text node or dom element.
 *
 * @private
 *
 * @param {String|Function} smth string to create text node or function to call
 * to create dom element
 * @returns {Text|Element} text node or dom element
 *
 */
function textOrElement(smth) {
  return isString(smth) ? createText(smth) : smth();
}


/**
 * Takes an element `target` and either string or function `smth`
 * as arguments, creates text node `node` from string `smth`
 * or calls function `smth`, which must return an element `el`, and appends
 * `node` or `el` to `target` as a child.
 *
 * @private
 *
 * @param {Element} target an element to append child to
 * @param {String|Function} smth string to create text node or function to call
 * to create an element
 * @returns {Element} target element
 *
 */
function createChild(target, smth) {
  const el = textOrElement(smth);
  // NB. side effect - unused assignment
  const child = target.appendChild(el);
  return target
}


/**
 * Takes an array `children` as an argument and returns **a new function**,
 * which then takes an element `target` as an argument, creates from `children`
 * child nodes, appends newly created nodes to `target` and returns `target`
 * back.
 *
 * An array `children` must contain either strings to create text nodes or
 * functions to call to create dom elements.
 *
 * @private
 *
 * @param {Array} children array, containing either strings to create
 * text nodes or functions to call to create dom elements
 * @returns {Function} to take an element `target` as an argument, create
 * child nodes, append them to `target` and return `target` back
 *
 */
function createChildren(children) {
  return function _createChildren(target) {
    return children.reduce(
      function __createChildren(el, item) {
        return isArray(item) ? item.reduce(__createChildren, el) : createChild(el, item);
      },
      target
    );
  };
}


/**
 * Takes a string `tagName`, an object `attrs`, an object `props` and an
 * array `children` as arguments and returns a function,
 * which can be called later to create dom element.
 *
 * Uses `createElement`, `setAttrs` and `setProps` to create an element and
 * set it's attributes and properties.
 *
 * @category Hyperscript
 *
 * @param {String} tagName tag name of dom element to create
 * @param {Object} attrs dom element attributes
 * @param {Object} props dom element properties
 * @param {Array} children an array of either strings to create child
 * text nodes or functions to create child dom elements
 * @returns {Function} function to call to create dom element according to
 * passed in arguments
 *
 * @see hSVG
 * @see render
 * @see renderAfter
 * @see renderC
 * @see renderR
 * @see createElement
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {h} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, ['Foo']),
 *       h('li', {'class': 'list-item'}, {}, ['Baz']),
 *       h('li', {'class': 'list-item'}, {}, ['Bar'])
 *     ]);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function h(tagName, attrs, props, children) {
  return pipe([
    lazy(createElement, tagName),
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}


/**
 * Takes a string `tagName`, an object `attrs`, an object `props` and an
 * array `children` as arguments and returns a function,
 * which can be called later to create svg dom element.
 *
 * Uses `createSVGElement`, `setAttrs` and `setProps` to create an element and
 * set it's attributes and properties.
 *
 * @category Hyperscript
 *
 * @param {String} tagName tag name of svg dom element to create
 * @param {Object} attrs svg dom element attributes
 * @param {Object} props svg dom element properties
 * @param {Array} children an array of either strings to create child
 * text nodes or functions to create child svg dom elements
 * @returns {Function} function to call to create svg dom element according to
 * passed in arguments
 *
 * @see h
 * @see render
 * @see renderAfter
 * @see renderC
 * @see renderR
 * @see createSVGElement
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {hSVG} from '@yagni-js/yagni-dom';
 *
 *     const circle = hSVG('svg', {'viewBox': '0 0 24 24', 'class': 'icon'}, {}, [
 *       hSVG('circle', {cx: 12, cy: 12, r: 8}, {}, [])
 *     ]);
 *
 *     const el = circle();
 *     // => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
 *     //      <circle cx="12" cy="12" r="8"></circle>
 *     //    </svg>
 *
 */
export function hSVG(tagName, attrs, props, children) {
  return pipe([
    lazy(createSVGElement, tagName),
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes either string to create text node or a function to call
 * to create dom element, appends newly created text node or dom element
 * to `target` as child and returns `target` element back.
 *
 * @category Hyperscript
 *
 * @param {Element} target target element to append newly created text node
 * or dom element to
 * @returns {Function} to take either string to create text node or function
 * to call to create dom element, append newly created text node or dom element
 * to `target` and return `target` back
 *
 * @see h
 * @see hSVG
 * @see renderAfter
 * @see renderC
 * @see renderR
 *
 * @example
 *
 *     import {h, render, createElement} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');  // => <div></div>
 *     const renderToDiv = render(div);
 *
 *     const p = h('p', {'class': 'story'}, {}, [
 *       'Here goes the story...'
 *     ]);
 *
 *     const el = renderToDiv(p);
 *     // => el is div
 *     // => <div>
 *     //      <p class="story">Here goes the story...</p>
 *     //    </div>
 *
 *
 */
export function render(target) {
  return function (smth) {
    return createChild(target, smth);
  };
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes either string to create text node or a function to call
 * to create dom element, appends newly created text node or dom element
 * after `target` element and returns newly created text node or dom element
 * back.
 *
 * @category Hyperscript
 *
 * @param {Element} target target element to append newly created text node
 * or dom element after
 * @returns {Function} to take either string to create text node or
 * a function to call to create dom element, append newly created text node
 * or dom element after `target` and return it back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderC
 * @see renderR
 * @see appendAfter
 *
 * @example
 *
 *     import {h, renderAfter} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, ['Foo']),
 *       h('li', {'class': 'list-item'}, {}, ['Baz'])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, ['Bar']);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const renderAfterBaz = renderAfter(el.lastChild);
 *
 *     const res = renderAfterBaz(item);
 *     // => res is item
 *
 *     // => el has the following structure:
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderAfter(target) {
  return pipe([
    textOrElement,
    appendAfter(target)
  ]);
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes either string to create text node or a function to call
 * to create dom element, removes all children elements from `target`,
 * appends newly created text node or dom element to `target` and
 * returns `target` element back.
 *
 * @category Hyperscript
 *
 * @param {Element} target element to remove all children elements from
 * and append newly created text node or dom element to
 * @returns {Function} to take either string to create text node or a
 * function to call to create dom element, remove all children elements from
 * `target`, append newly created text node or dom element to `target` and
 * return `target` element back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderAfter
 * @see renderR
 * @see removeChildren
 *
 * @example
 *
 *     import {h, renderC} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, ['Foo']),
 *       h('li', {'class': 'list-item'}, {}, ['Baz'])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, ['Bar']);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const clearListAndRender = renderC(el);
 *
 *     const res = clearListAndRender(item);
 *     // => res is el
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderC(target) {
  return function (smth) {
    return createChild(removeChildren(target), smth);
  };
}


/**
 * Takes an element `target` as an argument and returns **a new function**,
 * which then takes either string to create text node or a function to call
 * to create dom element, replaces `target` element with newly created
 * text node or dom element and returns newly created text node or dom element
 * back.
 *
 * @category Hyperscript
 *
 * @param {Element} target element to replace
 * @returns {Function} to take either string to create text node or a function
 * to call to create dom element, replace `target` element with newly created
 * text node or dom element and return it back
 *
 * @see h
 * @see hSVG
 * @see render
 * @see renderAfter
 * @see renderC
 * @see replace
 *
 * @example
 *
 *     import {h, renderR} from '@yagni-js/yagni-dom';
 *
 *     const list = h('ul', {'class': 'list', 'data-foo': 'baz', {}, [
 *       h('li', {'class': 'list-item'}, {}, ['Foo']),
 *       h('li', {'class': 'list-item'}, {}, ['Baz'])
 *     ]);
 *     const item = h('li', {'class': 'list-item'}, {}, ['Bar']);
 *
 *     const el = list();
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Baz</li>
 *     //    </ul>
 *
 *     const replaceBaz = renderR(el.lastChild);
 *
 *     const res = replaceBaz(item);
 *     // => res is item
 *
 *     // => el has the following structure:
 *
 *     // => <ul class="list" data-foo="baz">
 *     //      <li class="list-item">Foo</li>
 *     //      <li class="list-item">Bar</li>
 *     //    </ul>
 *
 */
export function renderR(target) {
  return pipe([
    textOrElement,
    replace(target)
  ]);
}
