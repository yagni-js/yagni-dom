
import { filter, pick, pipe, toArray } from '@yagni-js/yagni';

import { matches } from './query.js';


/**
 * Takes an Element `el` and returns it's parent Element. Returns `null`
 * if `el` has no parent or parent is not an Element.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Element} parent Element if exists, `null` otherwise
 *
 * @example
 *
 *     import {createElement, appendTo, parent} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *     const p = createElement('p');
 *
 *     const appendToDiv = appendTo(div);
 *
 *     const div2 = appendToDiv(p);   // => div2 is div
 *
 *     const res = parent(p);         // => res is div
 *
 */
export const parent = pick('parentElement');


/**
 * Takes an Element `el` and returns it's first child Element. Returns `null`
 * if there are no child elements.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Element} first child Element if exists, `null` otherwise
 *
 * @example
 *
 *     import {createElement, appendTo, firstChild} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li1);      // => ul2 is ul
 *     const ul3 = appendToList(li1);      // => ul3 is ul
 *
 *     const res = firstChild(ul);         // => li1
 *
 */
export const firstChild = pick('firstElementChild');


/**
 * Takes an Element `el` and returns it's last child Element. Returns `null`
 * if there are no child elements.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Element} last child Element if exists, `null` otherwise
 *
 * @example
 *
 *     import {createElement, appendTo, lastChild} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li2);      // => ul2 is ul
 *     const ul3 = appendToList(li3);      // => ul3 is ul
 *
 *     const res = lastChild(ul);          // => li3
 *
 */
export const lastChild = pick('lastElementChild');


/**
 * Takes an Element `el` and returns it's immediately following Element.
 * Returns `null` if `el` is the last element in the list.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Element} immediately following Element if exists, `null` otherwise
 *
 * @example
 *
 *     import {createElement, appendTo, next} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li2);      // => ul2 is ul
 *     const ul3 = appendToList(li3);      // => ul3 is ul
 *
 *     const res = next(li1);              // => li2
 *     const res = next(li2);              // => li3
 *     const res = next(li3);              // => null
 *
 */
export const next = pick('nextElementSibling');


/**
 * Takes an Element `el` and returns it's immediately preceding Element.
 * Returns `null` if `el` is the first element in the list.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Element} immediately preceding Element if exists, `null` otherwise
 *
 * @example
 *
 *     import {createElement, appendTo, prev} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li2);      // => ul2 is ul
 *     const ul3 = appendToList(li3);      // => ul3 is ul
 *
 *     const res = prev(li1);              // => null
 *     const res = prev(li2);              // => li1
 *     const res = prev(li3);              // => li2
 *
 */
export const prev = pick('previousElementSibling');


/**
 * Takes an Element `el` and returns **a new array**, containing all child
 * elements.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Array} array containing child elements
 *
 * @example
 *
 *     import {createElement, appendTo, children} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li2);      // => ul2 is ul
 *     const ul3 = appendToList(li3);      // => ul3 is ul
 *
 *     const res = children(ul);           // => [li1, li2, li3]
 *
 */
export const children = pipe([
  pick('children'),
  toArray
]);


/**
 * Takes css `selector` to match against as an argument and returns
 * **a new function**, which then takes an Element `el` as an argument
 * and returns **a new array**, containing all matching siblings.
 *
 * @function
 * @category Element
 *
 * @param {Element} el source element
 * @returns {Array} array containing matching siblings
 *
 * @example
 *
 *     import {createElement, appendTo, siblings} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToList = appendTo(ul);
 *     const others = siblings('li');
 *
 *     const ul1 = appendToList(li1);      // => ul1 is ul
 *     const ul2 = appendToList(li2);      // => ul2 is ul
 *     const ul3 = appendToList(li3);      // => ul3 is ul
 *
 *     const res1 = others(li1);           // => [li2, li3]
 *     const res2 = others(li2);           // => [li1, li3]
 *     const res3 = others(li3);           // => [li1, li2]
 *
 */
export function siblings(selector) {
  const match = matches(selector);
  return function (el) {
    const matched = function (x) { return x !== el && match(x); }
    return pipe([
      parent,
      children,
      filter(matched)
    ])(el);
  };
}

//
// alternative implementation for siblings()
//
// export function siblings(selector) {
//   return call(
//     pipe([
//       fn2(
//         and,
//         pipe([
//           equals,
//           not
//         ]),
//         pipe([
//           always(selector),
//           matches
//         ])
//       ),
//       filter
//     ]),
//     pipe([
//       parent,
//       children
//     ])
//   );
// }
