
import { callMethod, identity, ifElse, isNil, map, pick, pipe, tap, transform } from '@yagni-js/yagni';

import { children, firstChild, parent, next } from './tree.js';


export function append(el) {
  return tap(
    function (target) {
      return target.appendChild(el);
    }
  );
}

export function appendTo(target) {
  return function (el) {
    const child = target.appendChild(el);
    return parent(child);
  };
}

export function appendAfter(target) {
  return tap(
    function (el) {
      return parent(target).insertBefore(el, next(target));
    }
  );
}

export function prepend(el) {
  return function (target) {
    const child = target.insertBefore(el, firstChild(target));
    return parent(child);
  };
}

export function prependTo(target) {
  return function (el) {
    const child = target.insertBefore(el, firstChild(target));
    return parent(child);
  };
}

export const remove = pipe([
  transform({
    parent: parent,
    el: identity
  }),
  ifElse(
    pipe([pick('parent'), isNil]),
    pick('el'),
    pipe([
      tap(
        callMethod(pick('parent'), 'removeChild', pick('el'))
      ),
      pick('parent')
    ])
  )
]);

export const removeChildren = tap(
  pipe([
    children,
    map(remove)
  ])
);

export function replace(oldEl) {
  return tap(
    function (newEl) {
      return parent(oldEl).replaceChild(newEl, oldEl);
    }
  );
}
