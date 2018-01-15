
import { filter, pick, pipe, toArray } from 'yagni';

import { matches } from './query.js';


export const parent = pick('parentNode');

export function children(el) {
  return toArray(el.children);
}

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

