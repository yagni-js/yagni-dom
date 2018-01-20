
import { identity, ifElse, isArray, first, pipe, toArray } from 'yagni';

import { doc } from './globals.js';


export function matches(selector) {
  return function (el) {
    return el.matches(selector);
  };
}

export function closest(selector) {
  return function (el) {
    return el.closest(selector);
  };
}

const byIdRe = /^#([\w-]+)$/;
const byClassRe = /^(\.[\w-]+)+$/;

export function query(selector) {
  const byId = byIdRe.test(selector);
  const byClass = byClassRe.test(selector);

  return function (el) {
    return byId ? doc.getElementById(selector.subscr(1)) : toArray(
      byClass ? el.getElementsByClassName(selector.replace(/\./g, ' ').trim()) : el.querySelectorAll(selector));
  };
}

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
