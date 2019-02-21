
import { doc } from './globals.js';


/**
 * Takes `tagName` as an argument and returns newly created HTML element
 * specified by `tagName`.
 *
 * Uses `document.createElement` method.
 *
 * @category Element
 *
 * @param {String} tagName
 * @returns {Element} newly created HTML element
 *
 * @see createElementNS
 * @see createSVGElement
 * @see createText
 *
 * @example
 *
 *     import {createElement} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');  // => <div></div>
 *
 */
export function createElement(tagName) {
  return doc.createElement(tagName);
}


/**
 * Takes `namespace` URI as an argument and returns **a new function**,
 * which then takes `tagName` as an argument and returns newly created HTML
 * element with the specified `namespace` URI and `tagName`.
 *
 * Uses `document.createElementNS` method.
 *
 * Important Namespace URIs:
 *
 *   - [HTML]    http://www.w3.org/1999/xhtml
 *   - [SVG]     http://www.w3.org/2000/svg
 *   - [MathML]  http://www.w3.org/1998/mathml
 *
 * @category Element
 *
 * @param {URI} namespace
 * @returns {Function} to take `tagName` as an argument and return newly
 * created HTML element with the specified `namespace` URI and `tagName`
 *
 * @see createElement
 * @see createSVGElement
 * @see createText
 *
 * @example
 *
 *     import {createElementNS} from '@yagni-js/yagni-dom';
 *
 *     const createSVGEl = createElementNS('http://www.w3.org/2000/svg');
 *
 *     const svg = createSVGEl('svg');
 *     // => <svg xmlns="http://www.w3.org/2000/svg"></svg>
 *
 */
export function createElementNS(namespace) {
  return function (tagName) {
    return doc.createElementNS(namespace, tagName);
  };
}


/**
 * Takes `tagName` as an argument and returns newly created HTML element
 * with `http://www.w3.org/2000/svg` namespace URI and specified `tagName`.
 *
 * Uses `document.createElementNS` method.
 *
 * @function
 * @category Element
 *
 * @param {String} tagName
 * @returns {Element} newly created HTML element with
 * 'http://www.w3.org/2000/svg' namespace URI and specified `tagName`
 *
 * @see createElement
 * @see createElementNS
 * @see createText
 *
 * @example
 *
 *     import {createSVGElement} from '@yagni-js/yagni-dom';
 *
 *     const svg = createSVGElement('svg');
 *     // => <svg xmlns="http://www.w3.org/2000/svg"></svg>
 *
 */
export const createSVGElement = createElementNS('http://www.w3.org/2000/svg');


/**
 * Takes `text` as an argument and returns newly created Text node.
 *
 * Uses `document.createTextNode` method.
 *
 * @category Element
 *
 * @param {String} text text to be put to text node
 * @returns {TextNode} newly created Text node
 *
 * @see createElement
 * @see createElementNS
 * @see createSVGElement
 *
 * @example
 *
 *     import {createText} from '@yagni-js/yagni-dom';
 *
 *     const text = createText('foo');  // => #text "foo"
 *
 */
export function createText(text) {
  return doc.createTextNode(text);
}
