
import { camelize, mutate, pickPath, reduceObj } from '@yagni-js/yagni';


/**
 * Takes dataset property `name` as an argument and returns **a new function**,
 * which then takes an Element `el` as an argument and returns value of the
 * specified dataset property on the element.
 *
 * @category Element
 *
 * @param {String} name dataset property name to get value for
 * @returns {Function} to take Element `el` as an argument and return value of
 * the specified dataset property on the element or `undefined` if property
 * doesn't exist
 *
 * @see getAttr
 * @see getProp
 *
 * @example
 *
 *     import {h, hText, getData} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-href": "#top", "data-foo-baz": "bar"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getHref = getData('href');
 *     const getFooBaz = getData('foo-baz');
 *     const getBaz = getData('baz');
 *
 *     const href = getHref(el);         // => '#top'
 *     const fooBaz = getFooBaz(el);     // => 'bar'
 *     const baz = getBaz(el);           // => undefined
 *
 */
export function getData(name) {
  return pickPath(['dataset', camelize(name)]);
}


/**
 * Sets the value of a dataset property on the element and returns element.
 *
 * @category Element
 *
 * @param {Element} el target element
 * @param {String} name dataset property name
 * @param {*} value dataset property value
 * @returns {Element} el
 *
 * @private
 *
 */
function setDataset(el, name, value) {
  // NB. side effect
  const res = mutate(el.dataset, camelize(name), value);
  return el;
}


/**
 * Takes some dataset property `name` and `value` as arguments and returns
 * **a new function**, which then takes an Element `el` as an argument and
 * sets the value of a dataset property on the element. Returns `el`.
 *
 * `value` will always be converted into a string (for example, `null` value
 * will be converted into the string `"null"`).
 *
 * @category Element
 *
 * @param {String} name dataset property name
 * @param {*} value property value
 * @returns {Function} to take an Element `el` as an argument, set the value
 * of a dataset property on the element and return `el`
 *
 * @see setAttr
 * @see setProp
 *
 * @example
 *
 *     import {h, hText, getData, setData} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-foo": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const setFoo = setData('foo', 'baz');
 *
 *     const before = getFoo(el);   // => 'foo'
 *
 *     const el2 = setFoo(el);      // el2 is el
 *
 *     const after = getFoo(el);    // => 'baz'
 *
 */
export function setData(name, value) {
  return function _setData(el) {
    return setDataset(el, name, value);
  };
}


/**
 * Takes Element `el` as an argument and returns **a new function**,
 * which then takes some dataset property `name` and `value` as arguments and
 * sets the value of a dataset property on the element. Returns `el`.
 *
 * `value` will always be converted into a string (for example, `null` value
 * will be converted into the string `"null"`).
 *
 * @category Element
 *
 * @param {Element} el target Element
 * @returns {Function} to take some dataset property `name` and `value`,
 * set the value of a dataset property on the element and return `el`
 *
 * @see setAttrTo
 * @see setPropTo
 *
 * @example
 *
 *     import {h, hText, getData, setDataTo} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {"data-foo": "foo"}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const setElData = setDataTo(el);
 *
 *     const before = getFoo(el);            // => 'foo'
 *
 *     const el2 = setElData('foo', 'baz');  // el2 is el
 *
 *     const after = getFoo(el);             // => 'baz'
 *
 */
export function setDataTo(el) {
  return function _setDataTo(name, value) {
    return setDataset(el, name, value);
  };
}


/**
 * Takes an object `obj` of `(name, value)` pairs as an argument and
 * returns **a new function**, which then takes an Element `el` as an argument
 * and iteratively sets the value of a dataset property on the element for
 * each `(name, value)` pair from `obj`. Returns `el`.
 *
 * Object `obj` structure:
 *
 *     {name1: 'value1', name2: 'value2', ...}
 *
 * @function
 * @category Element
 *
 * @param {Object} obj source object of `(name, value)` pairs
 * @returns {Function} to take an Element `el` as an argument, iteratively
 * set dataset properties values on the `el` and return `el`
 *
 * @see setAttrs
 * @see setProps
 *
 * @example
 *
 *     import {h, hText, getData, setDatas} from '@yagni-js/yagni-dom';
 *
 *     const spec = h('a', {}, {}, [hText('Foo link')]);
 *     const el = spec();
 *
 *     const getFoo = getData('foo');
 *     const getBaz = getData('baz');
 *     const datasSetter = setDatas({foo: 'Foo', baz: 42});
 *
 *     const foo1 = getFoo(el);         // => undefined
 *     const baz1 = getBaz(el);         // => undefined
 *
 *     const el2 = datasSetter(el);     // el2 is el
 *
 *     const foo2 = getFoo(el);         // => 'Foo'
 *     const baz2 = getBaz(el);         // => '42'
 *
 */
export const setDatas = reduceObj(setDataset);
