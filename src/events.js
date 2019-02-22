
import { call, callMethod, identity, ifElse, isArray, isNil, or, pick, pipe, tap, transform } from '@yagni-js/yagni';

import { setProp } from './props.js';
import { matches, closest } from './query.js';


/**
 * Takes an Object `spec` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument, adds provided in `spec`
 * event handler to `el` and returns `el`.
 *
 * Uses `addEventListener` method of `el`.
 *
 * @category Events
 *
 * @param {Object} spec event listener specification
 * @param {String} spec.event name of the event
 * @param {Function} spec.handler event handler to add
 * @returns {Function} to take an Element `el` as an argument, add provided
 * in `spec` event handler to `el` and return `el`
 *
 * @see removeListener
 * @see eventHandler
 *
 *@example
 *
 *     import {createElement, addListener} from '@yagni-js/yagni-dom';
 *
 *     function clickHandler(evt) {
 *       // some code to handle click
 *     }
 *     const addClickHandler = addListener({
 *       'event': 'click',
 *       'handler': clickHandler
 *     });
 *
 *     const el = createElement('div');
 *
 *     const res = addClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` attached
 *
 */
export function addListener(spec) {
  return function (el) {
    // NB. unused assignment
    const res = el.addEventListener(spec.event, spec.handler, false);
    return el;
  };
}


/**
 * Takes an Object `spec` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument, removes provided in `spec`
 * event handler from `el` and returns `el`.
 *
 * Keep in mind that event name and event handler must be the same which were
 * used in `addListener` call earlier.
 *
 * Uses `removeEventListener` method of `el`.
 *
 * @category Events
 *
 * @param {Object} spec event listener specification
 * @param {String} spec.event name of the event
 * @param {Function} spec.handler event handler to remove
 * @returns {Function} to take an Element `el` as an argument, remove provided
 * in `spec` event handler from `el` and return `el`
 *
 * @see addListener
 * @see eventHandler
 *
 * @example
 *
 *     import {createElement, addListener, removeListener} from '@yagni-js/yagni-dom';
 *
 *     function clickHandler(evt) {
 *       // some code to handle click
 *     }
 *     const addClickHandler = addListener({
 *       'event': 'click',
 *       'handler': clickHandler
 *     });
 *     const removeClickHandler = removeListener({
 *       'event': 'click',
 *       'handler': clickHandler
 *     });
 *
 *     const el = createElement('div');
 *
 *     const res = addClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` attached
 *
 *     const res = removeClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` removed
 *
 */
export function removeListener(spec) {
  return function (el) {
    // NB. unused assignment
    const res = el.removeEventListener(spec.event, spec.handler, false);
    return el;
  };
}


/**
 * Takes an `event` type, css `selector` and event `handler` as an arguments
 * and returns **a new object** `spec` to be used as an argument for
 * `addListener` and `removeListener` functions.
 *
 * Event `handler` will be called in case event target element matches
 * css `selector` or there is an ancestor of the event target which matches
 * css `selector`.
 * Event `handler` will not be called and original DOM event will be returned
 * in case match could not be found.
 *
 * Event `handler` will be called with single argument, which is an object
 * holding two properties:
 *   - `originalEvent` - original DOM event
 *   - `matchedElement` - an element, matched to specified css `selector`
 *
 * @category Events
 *
 * @param {String} event name of the event
 * @param {String} selector css selector to find matching element
 * @param {Function} handler event handler to call
 * @returns {Object} to be used as an argument for `addListener` and
 * `removeListener` functions
 *
 * @see addListener
 * @see removeListener
 * @see preventDefault
 * @see stopPropagation
 *
 * @example
 *
 *     import {createElement, eventHandler, addListener} from '@yagni-js/yagni-dom';
 *
 *     // @param {Object}  evt
 *     // @param {Event}   evt.originalEvent original DOM event
 *     // @param {Element} evt.matchedElement DOM element matched to css selector
 *     function clickHandler(evt) {
 *       // some code to handle click
 *     }
 *
 *     const el = createElement('div');
 *     const eventSpec = eventHandler('click', 'div', clickHandler);
 *     const addClickHandler = addListener(eventSpec);
 *
 *     const res = addClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` attached
 *
 */
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


/**
 * Takes an Event `evt` or an Object `obj` holding Event under `originalEvent`
 * property as an argument, calls `preventDefault` method of that event and
 * returns passed in argument back.
 *
 * @function
 * @category Events
 *
 * @param {(Event|Object)} evt|obj.originalEvent event
 * @returns {(Event|Object)} passed in argument
 *
 * @see eventHandler
 *
 * @example
 *
 *     import {pipe} from '@yagni-js/yagni';
 *     import {createElement, eventHandler, addListener, preventDefault} from '@yagni-js/yagni-dom';
 *
 *     // @param {Object}  evt
 *     // @param {Event}   evt.originalEvent original DOM event
 *     // @param {Element} evt.matchedElement DOM element matched to css selector
 *     function handleClick(evt) {
 *       // some code to handle click
 *     }
 *
 *     const clickHandler = pipe([
 *       preventDefault,
 *       handleClick
 *     ]);
 *
 *     const el = createElement('a');
 *     const eventSpec = eventHandler('click', 'a', clickHandler);
 *     const addClickHandler = addListener(eventSpec);
 *
 *     const res = addClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` attached
 *     // => evt.preventDefault() method will be called on click
 *
 */
export const preventDefault = tap(
  pipe([
    or(pick('originalEvent'), identity),
    callMethod(identity, 'preventDefault')
  ])
);


/**
 * Takes an Event `evt` or an Object `obj` holding Event under `originalEvent`
 * property as an argument, calls `stopPropagation` method of that event and
 * returns passed in argument back.
 *
 * @function
 * @category Events
 *
 * @param {(Event|Object)} evt|obj.originalEvent event
 * @returns {(Event|Object)} passed in argument
 *
 * @see eventHandler
 *
 * @example
 *
 *     import {pipe} from '@yagni-js/yagni';
 *     import {createElement, eventHandler, addListener, stopPropagation} from '@yagni-js/yagni-dom';
 *
 *     // @param {Object}  evt
 *     // @param {Event}   evt.originalEvent original DOM event
 *     // @param {Element} evt.matchedElement DOM element matched to css selector
 *     function handleClick(evt) {
 *       // some code to handle click
 *     }
 *
 *     const clickHandler = pipe([
 *       stopPropagation,
 *       handleClick
 *     ]);
 *
 *     const el = createElement('a');
 *     const eventSpec = eventHandler('click', 'a', clickHandler);
 *     const addClickHandler = addListener(eventSpec);
 *
 *     const res = addClickHandler(el);
 *     // => res is el
 *     // => el has `clickHandler` attached
 *     // => evt.stopPropagation() method will be called on click
 *
 */
export const stopPropagation = tap(
  pipe([
    or(pick('originalEvent'), identity),
    callMethod(identity, 'stopPropagation')
  ])
);


/**
 * Takes an Array `arr` of event specs returned by `eventHandler` as an
 * argument and returns **a new function**, which then takes an Element `el`
 * as an argument, attaches event handlers to `el` using `addListener` and
 * returns `el` back.
 *
 * NB. Mutates passed in Element `el` by creating `el.__yagni_undelegate`
 * property which holds an array of functions to remove attached to `el`
 * event listeners.
 *
 * @category Events
 *
 * @param {Array} arr array of event specs returned by `eventHandler` function
 * @returns {Function} to take an Element `el` as an argument, attach event
 * handlers to `el` and return `el`
 *
 * @see eventHandler
 * @see addListener
 * @see undelegate
 *
 * @example
 *
 *     import {h, hText, eventHandler, delegate} from '@yagni-js/yagni-dom';
 *
 *     // @param {Object}  evt
 *     // @param {Event}   evt.originalEvent original DOM event
 *     // @param {Element} evt.matchedElement DOM element matched to css selector
 *     function addHandler(evt) {
 *       // some code to handle add
 *     }
 *     function removeHandler(evt) {
 *       // some code to handle remove
 *     }
 *
 *     const spec = h('div', {}, {}, [
 *       h('a', {class: 'add'}, {}, [hText('Add')]),
 *       h('a', {class: 'remove'}, {}, [hText('Remove')])
 *     ]);
 *     const el = spec();
 *
 *     const events = [
 *       eventHandler('click', '.add', addHandler),
 *       eventHandler('click', '.remove', removeHandler)
 *     ];
 *     const delegateEvents = delegate(events);
 *
 *     const res = delegateEvents(el);
 *     // => res is el
 *     // => el has `addHandler` and `removeHandler` attached
 *
 */
export function delegate(events) {
  const adders = events.map(addListener);
  const removers = events.map(removeListener);
  return pipe([
    tap(setProp('__yagni_undelegate', removers)),
    pipe(adders)
  ]);
}


/**
 * Takes an Element `el` as an argument, removes event listeners attached
 * to it by `delegate` beforehand and returns `el`.
 *
 * @function
 * @category Events
 *
 * @param {Element} el element to remove event listeners from
 * @returns {Element} passed in element
 *
 * @see delegate
 * @see removeListener
 *
 * @example
 *
 *     import {h, hText, eventHandler, delegate, undelegate} from '@yagni-js/yagni-dom';
 *
 *     // @param {Object}  evt
 *     // @param {Event}   evt.originalEvent original DOM event
 *     // @param {Element} evt.matchedElement DOM element matched to css selector
 *     function addHandler(evt) {
 *       // some code to handle add
 *     }
 *     function removeHandler(evt) {
 *       // some code to handle remove
 *     }
 *
 *     const spec = h('div', {}, {}, [
 *       h('a', {class: 'add'}, {}, [hText('Add')]),
 *       h('a', {class: 'remove'}, {}, [hText('Remove')])
 *     ]);
 *     const el = spec();
 *
 *     const events = [
 *       eventHandler('click', '.add', addHandler),
 *       eventHandler('click', '.remove', removeHandler)
 *     ];
 *     const delegateEvents = delegate(events);
 *
 *     const res1 = delegateEvents(el);
 *     // => res1 is el
 *     // => el has `addHandler` and `removeHandler` attached
 *
 *     // ...
 *
 *     const res2 = undelegate(el);
 *     // => res2 is el
 *     // => el has `addHandler` and `removeHandler` removed
 *
 */
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
