
import { fn2, identity, ifElse, isNil, pick, pipe, transform } from '@yagni-js/yagni';

import { children, firstChild, parent, next } from './tree.js';


export function append(el) {
  return function _append(target) {
    // NB. unused assignment
    const child = target.appendChild(el);
    return target;
  };
}

export function appendTo(target) {
  return function _appendTo(el) {
    // NB. unused assignment
    const child = target.appendChild(el);
    return target;
  };
}

export function appendAfter(target) {
  return function _appendAfter(el) {
    // NB. unused assignment
    const child = parent(target).insertBefore(el, next(target));
    return el;
  };
}

export function prepend(el) {
  return function _prepend(target) {
    // NB. unused assignment
    const child = target.insertBefore(el, firstChild(target));
    return target;
  };
}

export function prependTo(target) {
  return function _prependTo(el) {
    // NB. unused assignment
    const child = target.insertBefore(el, firstChild(target));
    return target;
  };
}


export function removeChild(el, child) {
  // NB. unused assignment
  const res = el.removeChild(child);
  return el;
}

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


export function removeChildren(el) {
  const elements = children(el);
  return elements.reduce(removeChild, el);
}


export function replace(oldEl) {
  return function _replace(newEl) {
    // NB. unused assignment
    const res = parent(oldEl).replaceChild(newEl, oldEl);
    return newEl;
  };
}
