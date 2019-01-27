
import { fn2, identity, ifElse, isNil, pick, pipe, transform } from '@yagni-js/yagni';

import { children, firstChild, parent, next } from './tree.js';


/**
 * Takes an Element `el` as an argument and returns **a new function**,
 * which then takes another Element `target` as an argument, appends
 * `el` to `target` as a last child and returns `target`.
 *
 * Uses `appendChild` method of `target` element.
 *
 * @category Tree mutation
 *
 * @param {Element} el element to be appended
 * @returns {Function} to take another Element `target` as an argument,
 * append `el` to `target` as a last child and return `target`
 *
 * @see appendTo
 * @see appendAfter
 * @see prepend
 * @see prependTo
 *
 * @example
 *
 *     import {createElement, append} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *
 *     const appendLi = append(li);
 *
 *     const res = appendLi(ul);
 *     // => res is ul
 *     // => <ul><li></li></ul>
 *
 */
export function append(el) {
  return function _append(target) {
    // NB. unused assignment
    const child = target.appendChild(el);
    return target;
  };
}


/**
 * Takes an Element `target` as an argument and returns **a new function**,
 * which then takes another Element `el` as an argument, appends
 * `el` to `target` as a last child and returns `target`.
 *
 * Uses `appendChild` method of `target` element.
 *
 * @category Tree mutation
 *
 * @param {Element} target element to append child to
 * @returns {Function} to take another Element `el` as an argument,
 * append `el` to `target` as a last child and return `target`
 *
 * @see append
 * @see appendAfter
 * @see prepend
 * @see prependTo
 *
 * @example
 *
 *     import {createElement, appendTo} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *
 *     const appendToUl = appendTo(ul);
 *
 *     const res = appendToUl(li);
 *     // => res is ul
 *     // => <ul><li></li></ul>
 *
 */
export function appendTo(target) {
  return function _appendTo(el) {
    // NB. unused assignment
    const child = target.appendChild(el);
    return target;
  };
}


/**
 * Takes an Element `target` as an argument and returns **a new function**,
 * which then takes another Element `el` as an argument, appends `el` after
 * `target` and returns `el`.
 *
 * Uses `insertBefore` method of parent element of `target`.
 *
 * @category Tree mutation
 *
 * @param {Element} target element to append after
 * @returns {Function} to take another Element `el` as an argument,
 * append `el` after `target` and return `el
 *
 * @see append
 * @see appendTo
 * @see prepend
 * @see prependTo
 *
 * @example
 *
 *     import {createElement, appendTo, appendAfter} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *     const ul = createElement('ul');
 *     const p = createElement('p');
 *
 *     const appendToDiv = appendTo(div);
 *     const appendAfterUl = appendAfter(ul);
 *
 *     const div1 = appendToDiv(ul);
 *     // => div1 is div
 *     // => <div><ul></ul></div>
 *
 *     const res = appendAfterUl(p);
 *     // => res is p
 *     // => <div><ul></ul><p></p></div>
 *
 */
export function appendAfter(target) {
  return function _appendAfter(el) {
    // NB. unused assignment
    const child = parent(target).insertBefore(el, next(target));
    return el;
  };
}


/**
 * Takes an Element `el` as an argument and returns **a new function**,
 * which then takes another Element `target` as an argument, appends
 * `el` to `target` as a first child and returns `target`.
 *
 * Uses `insertBefore` method of `target` element.
 *
 * @category Tree mutation
 *
 * @param {Element} el element to be prepended
 * @returns {Function} to take another Element `target` as an argument,
 * append `el` to `target` as a first child and return `target`
 *
 * @see append
 * @see appendTo
 * @see appendAfter
 * @see prependTo
 *
 * @example
 *
 *     import {createElement, appendTo, prepend} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *     const ul = createElement('ul');
 *     const p = createElement('p');
 *
 *     const appendToDiv = appendTo(div);
 *     const prependP = prepend(p);
 *
 *     const div1 = appendToDiv(ul);
 *     // => div1 is div
 *     // => <div><ul></ul></div>
 *
 *     const div2 = prependP(div);
 *     // => div2 is div
 *     // => <div><p></p><ul></ul></div>
 *
 */
export function prepend(el) {
  return function _prepend(target) {
    // NB. unused assignment
    const child = target.insertBefore(el, firstChild(target));
    return target;
  };
}


/**
 * Takes an Element `target` as an argument and returns **a new function**,
 * which then takes another Element `el` as an argument, appends
 * `el` to `target` as a first child and returns `target`.
 *
 * Uses `insertBefore` method of `target` element.
 *
 * @category Tree mutation
 *
 * @param {Element} target element to prepend to
 * @returns {Function} to take another Element `el` as an argument,
 * append `el` to `target` as a first child and return `target`
 *
 * @see append
 * @see appendTo
 * @see appendAfter
 * @see prepend
 *
 * @example
 *
 *     import {createElement, prependTo} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *     const ul = createElement('ul');
 *     const p = createElement('p');
 *
 *     const prependToDiv = prependTo(div);
 *
 *     const div1 = prependToDiv(ul);
 *     // => div1 is div
 *     // => <div><ul></ul></div>
 *
 *     const div2 = prependToDiv(div);
 *     // => div2 is div
 *     // => <div><p></p><ul></ul></div>
 *
 */
export function prependTo(target) {
  return function _prependTo(el) {
    // NB. unused assignment
    const child = target.insertBefore(el, firstChild(target));
    return target;
  };
}


/**
 * Takes two Elements `el` and `child` as arguments, removes `child` from `el`
 * and returns `el`.
 *
 * Uses `removeChild` method of `el`.
 *
 * @category Tree mutation
 *
 * @param {Element} el parent element to remove child from
 * @param {Element} child child element to remove
 * @returns {Element} parent element `el`
 *
 * @see remove
 * @see removeChildren
 * @see replace
 *
 * @example
 *
 *     import {createElement, appendTo, removeChild} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *
 *     const appendToUl = appendTo(ul);
 *
 *     const ul1 = appendToUl(li);
 *     // => ul1 is ul
 *     // => <ul><li></li></ul>
 *
 *     const ul2 = removeChild(ul, li);
 *     // => ul2 is ul
 *     // => <ul></ul>
 *
 */
export function removeChild(el, child) {
  // NB. unused assignment
  const res = el.removeChild(child);
  return el;
}

/**
 * Takes an Element `el` as an argument and removes it from DOM tree.
 * Returns parent element if `el` has parent element, returns `el` if `el`
 * has no parent element.
 *
 * Uses `removeChild` method of parent element of `el`.
 *
 * @function
 * @category Tree mutation
 *
 * @param {Element} el element to remove
 * @returns {Element} parent element if `el` has parent or `el` otherwise
 *
 * @see removeChild
 * @see removeChildren
 * @see replace
 *
 * @example
 *
 *     import {createElement, appendTo, remove} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li = createElement('li');
 *
 *     const appendToUl = appendTo(ul);
 *
 *     const ul1 = appendToUl(li);
 *     // => ul1 is ul
 *     // => <ul><li></li></ul>
 *
 *     const ul2 = remove(li);
 *     // => ul2 is ul
 *     // => <ul></ul>
 *
 */
export const remove = pipe([
  transform({
    parent: parent,
    el: identity
  }),
  ifElse(
    pipe([pick('parent'), isNil]),
    pick('el'),
    fn2(removeChild, pick('parent'), pick('el'))
  )
]);


/**
 * Takes an Element `el` as an argument, removes all children elements and
 * returns `el`.
 *
 * Uses `removeChild` method of `el`.
 *
 * @category Tree mutation
 *
 * @param {Element} el element to remove children elements from
 * @returns {Element} `el`
 *
 * @see remove
 * @see removeChild
 *
 * @example
 *
 *     import {createElement, appendTo, removeChildren} from '@yagni-js/yagni-dom';
 *
 *     const ul = createElement('ul');
 *     const li1 = createElement('li');
 *     const li2 = createElement('li');
 *     const li3 = createElement('li');
 *
 *     const appendToUl = appendTo(ul);
 *
 *     const ul1 = appendToUl(li1);  // => ul1 is ul
 *     const ul2 = appendToUl(li2);  // => ul2 is ul
 *     const ul3 = appendToUl(li3);  // => ul3 is ul
 *     // => <ul><li></li><li></li><li></li></ul>
 *
 *     const res = removeChildren(ul);
 *     // => res is ul
 *     // => <ul></ul>
 *
 */
export function removeChildren(el) {
  const elements = children(el);
  return elements.reduce(removeChild, el);
}


/**
 * Takes an Element `oldEl` as an argument and returns **a new function**,
 * which then takes another Element `newEl` as an argument, replaces
 * `oldEl` with `newEl` and returns `newEl`.
 *
 * Uses `replaceChild` method of parent element of `oldEl`.
 *
 * @category Tree mutation
 *
 * @param {Element} oldEl element to be replaced
 * @returns {Function} to take another Element `newEl` as an argument,
 * replace `oldEl` with `newEl` and return `newEl`
 *
 * @see remove
 * @see removeChild
 *
 * @example
 *
 *     import {createElement, appendTo, replace} from '@yagni-js/yagni-dom';
 *
 *     const div = createElement('div');
 *     const a = createElement('a');
 *     const span = createElement('span');
 *
 *     const appendToDiv = appendTo(div);
 *     const replaceA = replace(a);
 *
 *     const div1 = appendToDiv(a);
 *     // => div1 is div
 *     // => <div><a></a></div>
 *
 *     const span1 = replaceA(span);
 *     // => span1 is span
 *     // => <div><span></span></div>
 *
 */
export function replace(oldEl) {
  return function _replace(newEl) {
    // NB. unused assignment
    const res = parent(oldEl).replaceChild(newEl, oldEl);
    return newEl;
  };
}
