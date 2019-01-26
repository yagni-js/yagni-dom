
import { identity, ifElse, isArray, first, pipe, toArray } from '@yagni-js/yagni';

import { doc } from './globals.js';


/**
 * Takes css `selector` as an argument and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * returns `true` if `el` matches specified `selector`, returns `false`
 * otherwise.
 *
 * Uses `matches` method of element.
 *
 * @category Element
 *
 * @param {String} selector css selector
 * @returns {Function} to take Element `el` as an argument and return `true`
 * if `el` matches `selector` or `false` otherwise
 *
 * @example
 *
 *     import {createElement, addClass, matches} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *
 *     const addFooClass = addClass('foo');
 *     const matchesFooClass = matches('.foo');
 *     const matchesBazClass = matches('.baz');
 *
 *     const el = addFooClass(div);        // => el is div
 *
 *     const res1 = matchesFooClass(el);   // => true
 *     const res2 = matchesBazClass(el);   // => false
 *
 */
export function matches(selector) {
  return function _matches(el) {
    return el.matches(selector);
  };
}


/**
 * Takes css `selector` as an argument and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * returns the closest ancestor of the `el` which matches the `selector`.
 * Returns `null` if there is no such an ancestor.
 *
 * Uses `closest` method of element.
 *
 * @category Element
 *
 * @param {String} selector css selector
 * @returns {Function} to take an Element `el` as an argument and return
 * closest ancestor of `el` which matches the `selector` or `null` if there is
 * no such an ancestor
 *
 * @example
 *
 *     import {createElement, appendTo, addClass, closest} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *     const a = createElement('a');
 *     const span = createElement('span');
 *
 *     const addFooClass = addClass('foo');
 *     const closestFoo = closest('.foo');
 *
 *     const appendToUl = appendTo(ul);
 *     const appendToLi = appendTo(li);
 *     const appendToA = appendTo(a);
 *
 *     const ul1 = appendToUl(li);     // => ul1 is ul
 *     const li1 = appendToLi(a);      // => li1 is li
 *     const a1 = appendToA(span);     // => a1 is a
 *
 *     const li2 = addFooClass(li);    // => li2 is li
 *
 *     const res1 = closestFoo(span);  // => li
 *     const res2 = closestFoo(a);     // => li
 *     const res3 = closestFoo(li);    // => null
 *     const res4 = closestFoo(ul);    // => null
 *
 */
export function closest(selector) {
  return function _closest(el) {
    return el.closest(selector);
  };
}


const byIdRe = /^#([\w-]+)$/;
const byClassRe = /^(\.[\w-]+)+$/;


/**
 * Takes css `selector` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns an element or
 * an array of elements within `el` that matches specified `selector`.
 *
 * Uses `getElementById` method of element for searches by element's `id`.
 * Uses `getElementsByClassName` method of element for searches by single or
 * multiple class names.
 * Uses `querySelectorAll` method of element for other cases.
 *
 * For searches by element id returns single element or `null` if there is
 * no match.
 * For other cases returns an array.
 *
 * @category Element
 *
 * @param  {String} selector css selector
 * @returns {Function} to take an Element `el` as an argument and return
 * single element or an array of elements within `el` that matches `selector`,
 * or `null` if there are no matches
 *
 * @example
 *
 *     import {createElement, appendTo, setAttr, query} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *     const a = createElement('a');
 *     const span = createElement('span');
 *
 *     const setFooBarClass = setAttr('class', 'foo bar');
 *     const setBazId = setAttr('id', 'baz');
 *     const queryFoo = query('.foo.bar');
 *     const queryBaz = query('#baz');
 *
 *     const appendToUl = appendTo(ul);
 *     const appendToLi = appendTo(li);
 *     const appendToA = appendTo(a);
 *
 *     const ul1 = appendToUl(li);     // => ul1 is ul
 *     const li1 = appendToLi(a);      // => li1 is li
 *     const a1 = appendToA(span);     // => a1 is a
 *
 *     const li2 = setFooBarClass(li); // => li2 is li
 *     const a2 = setBazId(a);         // => a2 is a
 *
 *     const res1 = queryFoo(ul);      // => [li]
 *     const res2 = queryFoo(li);      // => [li]
 *     const res3 = queryFoo(a);       // => []
 *     const res4 = queryFoo(span);    // => []
 *
 *     const res5 = queryBaz(ul);      // => a
 *     const res6 = queryBaz(a);       // => a
 *     const res7 = queryBaz(span);    // => null
 *
 */
export function query(selector) {
  const byId = byIdRe.test(selector);
  const byClass = byClassRe.test(selector);

  return function _query(el) {
    return byId ? doc.getElementById(selector.substr(1)) : toArray(
      byClass ? el.getElementsByClassName(selector.replace(/\./g, ' ').trim()) : el.querySelectorAll(selector));
  };
}


/**
 * Takes css `selector` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns
 * first element within `el` that matches specified `selector`.
 *
 * Uses `query` and returns first element from an array of found elements.
 * For searches by element id returns `query` result as is.
 *
 * @category Element
 *
 * @param  {String} selector css selector
 * @returns {Function} to take an Element `el` as an argument and return
 * first element within `el` that matches `selector`
 *
 * @example
 *
 *     import {createElement, appendTo, queryFirst} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToUl = appendTo(ul);
 *     const firstLi = queryFirst('li');
 *     const firstSpan = queryFirst('span');
 *     const firstById = queryFirst('#first');
 *
 *     const ul1 = appendToUl(li1);       // => ul1 is ul
 *     const ul2 = appendToUl(li2);       // => ul2 is ul
 *     const ul3 = appendToUl(li3);       // => ul3 is ul
 *
 *     const res1 = firstLi(ul);          // => li1
 *     const res2 = firstSpan(li2);       // => undefined
 *     const res3 = firstById(li3);       // => null
 *
 */
export function queryFirst(selector) {
  return pipe([
    query(selector),
    ifElse(
      isArray,
      first,
      identity
    )
  ]);
}
