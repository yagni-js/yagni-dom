
import { pipe, pick, callMethod, tap, identity } from '@yagni-js/yagni';


/**
 * Operates on the `Element.classList` property.
 * Takes `method` name as an argument and returns **a new function**,
 * which then takes `classname` as an argument and returns another
 * **new function**, which then takes an Element `el` as an argument and
 * calls `Element.classList[method](classname)`. Returns `el`.
 *
 * Intented to be used for `add`, `remove` and `toggle` methods.
 *
 * @category Element
 *
 * @private
 *
 */
function classListOp(method) {
  return function (classname) {
    return tap(
      pipe([
        pick('classList'),
        callMethod(identity, method, classname)
      ])
    );
  };
}


/**
 * Takes some `classname` as an argument and returns **a new function**,
 * which then takes Element `el` as an argument, calls
 * `Element.classList.add` method using `classname` as an argument and
 * returns `el`.
 *
 * @function
 * @category Element
 *
 * @param {String} classname
 * @returns {Function} to take Element `el` as an argument, call
 * `Element.classList.add` method using `classname` as an argument and
 * return `el`
 *
 * @example
 *
 *     import {h, hText, createElement, addClass, hasClass} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const addFooClass = addClass('foo');
 *     const hasFooClass = hasClass('foo');
 *
 *     const before = hasFooClass(el);    // => false
 *
 *     const el2 = addFooClass(el);       // => el2 is el
 *
 *     const after = hasFooClass(el);     // => true
 *
 */
export const addClass = classListOp('add');


/**
 * Takes some `classname` as an argument and returns **a new function**,
 * which then takes Element `el` as an argument, calls
 * `Element.classList.remove` method using `classname` as an argument and
 * returns `el`.
 *
 * @function
 * @category Element
 *
 * @param {String} classname
 * @returns {Function} to take Element `el` as an argument, call
 * `Element.classList.remove` method using `classname` as an argument and
 * return `el`
 *
 * @example
 *
 *     import {h, hText, removeClass, hasClass} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"class": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const removeFooClass = removeClass('foo');
 *     const hasFooClass = hasClass('foo');
 *
 *     const before = hasFooClass(el);    // => true
 *
 *     const el2 = removeFooClass(el);    // => el2 is el
 *
 *     const after = hasFooClass(el);     // => false
 *
 */
export const removeClass = classListOp('remove');


/**
 * Takes some `classname` as an argument and returns **a new function**,
 * which then takes Element `el` as an argument, calls
 * `Element.classList.toggle` method using `classname` as an argument and
 * returns `el`.
 *
 * @function
 * @category Element
 *
 * @param {String} classname
 * @returns {Function} to take Element `el` as an argument, call
 * `Element.classList.toggle` method using `classname` as an argument and
 * return `el`
 *
 * @example
 *
 *     import {h, hText, removeClass, hasClass} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"class": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const toggleFooClass = toggleClass('foo');
 *     const hasFooClass = hasClass('foo');
 *
 *     const before = hasFooClass(el);    // => true
 *
 *     const el2 = toggleFooClass(el);    // => el2 is el
 *
 *     const after = hasFooClass(el);     // => false
 *
 *     const el3 = toggleFooClass(el);    // => el3 is el
 *
 *     const after2 = hasFooClass(el);    // => true
 *
 */
export const toggleClass = classListOp('toggle');


/**
 * Takes some `classname` as an argument and returns **a new function**,
 * which then takes Element `el` as an argument and returns result of
 * `Element.classList.contains` method call using `classname` as an argument.
 *
 * @function
 * @category Element
 *
 * @param {String} classname
 * @returns {Function} to take Element `el` as an argument and return
 * the result of `Element.classList.contains` method call using `classname`
 * as an argument.
 *
 * @example
 *
 *     import {h, hText, hasClass} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"class": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const hasFooClass = hasClass('foo');
 *     const hasBazClass = hasClass('baz');
 *
 *     const res1 = hasFooClass(el);  // => true
 *     const res2 = hasBazClass(el);  // => false
 *
 */
export function hasClass(classname) {
  return pipe([
    pick('classList'),
    callMethod(identity, 'contains', classname)
  ]);
}
