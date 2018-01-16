
import { callMethod, identity, ifElse, isNil, pick, pipe, tap, transform } from 'yagni';

import { parent, next } from './tree.js';


export function append(el) {
  return tap(
    function (target) {
      return target.appendChild(el);
    }
  );
}

export function appendAfter(el) {
  return tap(
    function (target) {
      return parent(target).insertBefore(el, next(target));
    }
  );
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
