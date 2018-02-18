
import { call, callMethod, identity, ifElse, isArray, isNil, or, pick, pipe, tap, transform } from '@yagni-js/yagni';

import { setProp } from './props.js';
import { matches, closest } from './query.js';


// spec: {event: 'click', handler: function () {}}
export function addListener(spec) {
  return tap(function (el) {
    return el.addEventListener(spec.event, spec.handler, false);
  });
}

// spec: {event: 'click', handler: function () {}}
export function removeListener(spec) {
  return tap(function (el) {
    return el.removeEventListener(spec.event, spec.handler, false);
  });
}

export function eventHandler(event, selector, handler) {
  const target = pick('target');
  const matchedEl = pipe([
    target,
    ifElse(
      matches(selector),
      identity,
      closest(selector)
    )
  ]);
  const wrapper = pipe([
    transform({
      originalEvent: identity,
      matchedElement: matchedEl
    }),
    ifElse(
      pipe([
        pick('matchedElement'),
        isNil
      ]),
      pick('originalEvent'),
      handler
    )
  ]);

  return {event: event, handler: wrapper};
}

export const preventDefault = tap(
  pipe([
    or(pick('originalEvent'), identity),
    callMethod(identity, 'preventDefault')
  ])
);

export const stopPropagation = tap(
  pipe([
    or(pick('originalEvent'), identity),
    callMethod(identity, 'stopPropagation')
  ])
);

// events = [
//     eventHandler('click', '.add', function(evt) {...}),
//     eventHandler('click', '.remove', function(evt) {...}),
//     ...
// ]
export function delegate(events) {
  const adders = events.map(addListener);
  const removers = events.map(removeListener);
  return pipe([
    tap(setProp('__yagni_undelegate', removers)),
    pipe(adders)
  ]);
}

// el: DOM element
export const undelegate = ifElse(
  pipe([
    pick('__yagni_undelegate'),
    isArray
  ]),
  tap(
    pipe([
      call(
        pipe([
          pick('__yagni_undelegate'),
          pipe
        ]),
        identity
      ),
      setProp('__yagni_undelegate', false)
    ])
  ),
  identity
);
