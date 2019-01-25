
import { filter, pick, pipe, toArray } from '@yagni-js/yagni';

import { matches } from './query.js';


export const parent = pick('parentElement');
export const firstChild = pick('firstElementChild');
export const lastChild = pick('lastElementChild');
export const next = pick('nextElementSibling');
export const prev = pick('previousElementSibling');

export const children = pipe([
  pick('children'),
  toArray
]);

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
