
import { isDefined, reduceObj, tap } from '@yagni-js/yagni';


/**
 * Takes an attribute `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns value
 * of an attribute on the element.
 * Returns **`null`** if attribute doesn't exist.
 *
 * Uses `getAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name to get value for
 * @returns {Function} to take `el` as an argument and return value of
 * an attribute on the element or `null` if attribute doesn't exist
 *
 * @see getProp
 * @see getData
 *
 * @example
 *
 *     import {h, hToDOM, getAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, ['Foo link']);
 *     const el = hToDOM(spec);
 *
 *     const getTitle = getAttr('title');
 *     const getHref = getAttr('href');
 *
 *     const title = getTitle(el);   // => 'Foo'
 *     const href = getHref(el);     // => null
 *
 */
export function getAttr(name) {
  return function _getAttr(el) {
    return el.getAttribute(name);
  };
}


/**
 * Sets the value of an attribute on the element and returns element.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {Element} el target element
 * @param {String} name attribute name
 * @param {String} value attribute value
 * @returns {Element} el
 *
 * @private
 *
 */
function setAttribute(el, name, value) {
  // NB. side effect
  const res = isDefined(value) ? el.setAttribute(name, value) : el;
  return el;
}


/**
 * Takes an attribute `name` and `value` as arguments and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * sets the value of an attribute on the element. Returns `el`.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name
 * @param {String} value attribute value
 * @returns {Function} to take an Element `el` as an argument, set the value
 * of an attribute on the element and return `el`
 *
 * @see setProp
 * @see setData
 *
 * @example
 *
 *     import {h, hToDOM, getAttr, setAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, ['Foo link']);
 *     const el = hToDOM(spec);
 *
 *     const getHref = getAttr('href');
 *     const setHrefToTop = setAttr('href', '#top');
 *
 *     const before = getHref(el);     // => null
 *
 *     const el2 = setHrefToTop(el);   // el2 is el
 *
 *     const after = getHref(el2);     // => '#top'
 *
 */
export function setAttr(name, value) {
  return function _setAttr(el) {
    return setAttribute(el, name, value);
  };
}


/**
 * Takes Element `el` as an argument and returns **a new function**,
 * which then takes an attribute `name` and `value` as arguments and sets
 * the value of an attribute on the element. Returns `el`.
 * If value is not defined (is `undefined` or `null`) it will not be set.
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {Element} el target Element
 * @returns {Function} to take an attribute `name` and `value`, set the
 * value of an attribute on the element and return `el`
 *
 * @see setPropTo
 * @see setDataTo
 *
 * @example
 *
 *     import {h, hToDOM, getAttr, setAttrTo} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo'}, {}, ['Foo link']);
 *     const el = hToDOM(spec);
 *
 *     const getHref = getAttr('href');
 *     const setElAttr = setAttrTo(el);
 *
 *     const before = getHref(el);              // => null
 *
 *     const el2 = setElAttr('href', '#top');   // => el2 is el
 *
 *     const after = getHref(el2);              // => '#top'
 *
 */
export function setAttrTo(el) {
  return function _setAttrTo(name, value) {
    return setAttribute(el, name, value);
  };
}


/**
 * Takes an object `obj` of `(name, value)` pairs as an argument and
 * returns **a new function**, which then takes an Element `el` as an argument
 * and iteratively sets the value of an attribute on the element for
 * each `(name, value)` pair from `obj`. Returns `el`.
 * If value for a correspondent attribute is not defined
 * (is `undefined` or `null`) it will not be set.
 *
 * Object `obj` structure:
 *
 *     {attr1: 'value1', attr2: 'value2', ...}
 *
 * Uses `setAttribute` method of Element.
 *
 * @category Element
 *
 * @param {Object} obj source object of attribute `(name, value)` pairs
 * @returns {Function} to take an Element `el` as an argument, iteratively
 * set attributes values on the `el` and return `el`
 *
 * @see setProps
 * @see setDatas
 *
 * @example
 *
 *     import {h, hToDOM, getAttr, setAttrs} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, ['Foo link']);
 *     const el = hToDOM(spec);
 *
 *     const getHref = getAttr('href');
 *     const getTitle = getAttr('title');
 *     const attrsSetter = setAttrs({title: 'Foo', href: '#top'});
 *
 *     const title1 = getTitle(el);     // => null
 *     const href1 = getHref(el);       // => null
 *
 *     const el2 = attrsSetter(el);
 *
 *     const title2 = getTitle(el);     // => 'Foo'
 *     const href2 = getHref(el);       // => '#top'
 *
 */
export const setAttrs = reduceObj(setAttribute);


/**
 * Takes an attribute `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument, removes an attribute
 * from the element and returns `el`.
 *
 * Uses `removeAttribute` method of Element.
 *
 * @category Element
 *
 * @param {String} name attribute name
 * @returns {Function} to take an Element `el` as an argument, remove an
 * attribute from the element and return `el`
 *
 * @example
 *
 *     import {h, hToDOM, getAttr, removeAttr} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {title: 'Foo', href: '#top'}, {}, ['Foo link']);
 *
 *     const removeTitle = remoteAttr('title');
 *
 *     const el = hToDOM(spec);
 *     // => <a href="#top" title="Foo">Foo link</a>
 *
 *     const el2 = removeTitle(el);
 *     // => <a href="#top">Foo link</a>
 *     // el2 === el
 *
 */
export function removeAttr(name) {
  return tap(
    function _removeAttr(el) {
      return el.removeAttribute(name);
    }
  );
}
