
import {call, callMethod, equals, fn2, identity, ifElse, obj, pipe, reduce } from '@yagni-js/yagni';

import { query } from './query.js';
import { getProp, setProp } from './props.js';


/**
 * Takes an input element `el` as an argument and returns its `name`
 * property value.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {String} value of input element `name` property
 *
 * @private
 *
 */
const inputName = getProp('name');


/**
 * Takes an input element `el` as an argument and returns its `value`
 * property value.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {String} value of input element `value` property
 *
 * @private
 *
 */
const inputValue = getProp('value');


/**
 * Takes an input element `el` as an argument and returns its `type`
 * property value.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {String} value of input element `type` property
 *
 * @example
 *
 *     import {inputType, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {'type': 'email', 'name': 'email'}, {}, []);
 *     const el = inp();
 *
 *     const inpType = inputType(el);  // => 'email'
 *
 */
export const inputType = getProp('type');


/**
 * Takes an input element `el` as an argument and returns its `checked`
 * property value.
 *
 * Applies only to elements of type `checkbox` or `radio`.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} value of input element `checked` property
 *
 * @private
 *
 */
const isChecked = getProp('checked');


/**
 * Takes an input element `el` as an argument and returns its `disabled`
 * property value.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} value of input element `disabled` property
 *
 * @private
 *
 */
const isDisabled = getProp('disabled');


/**
 * Takes an input element `el` as an argument and returns `true` if `type` of
 * `el` is `file` and `false` otherwise.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} `true` if `type` of `el` is `file` and `false` otherwise
 *
 * @private
 *
 */
const isFile = pipe([
  inputType,
  equals('file')
]);


/**
 * Takes an input element `el` as an argument and returns `true` if `type` of
 * `el` is `checkbox` and `false` otherwise.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} `true` if `type` of `el` is `checkbox` and `false` otherwise
 *
 * @private
 *
 */
const isCheckbox = pipe([
  inputType,
  equals('checkbox')
]);


/**
 * Takes an input element `el` as an argument and returns `true` if `type` of
 * `el` is `radio` and `false` otherwise.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} `true` if `type` of `el` is `radio` and `false` otherwise
 *
 * @private
 *
 */
const isRadio = pipe([
  inputType,
  equals('radio')
]);


/**
 * Returns newly created empty object.
 *
 * @function
 * @category Form
 *
 * @returns {Object} new object
 *
 * @private
 *
 */
function makeNewObj() {
  return {};
}


/**
 * Takes a radio input element `el` as an argument and returns its serialized
 * value as `{inpName: inpValue}` object if `el` is checked.
 * If input is not checked returns empty object.
 *
 * @function
 * @category Form
 *
 * @param {Element} el radio input element
 * @returns {Object} serialized value as `{inpName: inpValue}` object if `el`
 * is checked or empty object otherwise
 *
 * @private
 *
 */
function serializeRadio(el) {
  return isChecked(el) ? obj(inputName(el), inputValue(el)) : {};
}


/**
 * Takes a checkbox input element `el` as an argument and returns its serialized
 * value as `{inpName: true}` object if `el` is checked.
 * If input is not checked returns empty object.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Object} serialized value as `{inpName: true}` object if `el`
 * is checked or empty object otherwise
 *
 * @private
 *
 */
function serializeCheckbox(el) {
  return isChecked(el) ? obj(inputName(el), true) : {};
}


/**
 * Takes a file input element `el` as an argument and returns empty object
 * (serialization of `file` input is not supported).
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Object} empty object
 *
 * @private
 *
 */
function serializeFile(el) {
  return {};
}


/**
 * Takes an input element `el` as an argument and returns its serialized
 * value.
 * Returns empty object if input is disabled.
 * Returns empty object if `el` is file input.
 * Returns empty object if `el` is unchecked checkbox or radio input.
 * Returns `{inpName: true}` if `el` is checked checkbox.
 * Returns `{inpName: inpValue}` object in all other cases.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Object} serialized input value
 *
 * @example
 *
 *     import {serializeInput, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {'type': 'email', 'name': 'email', 'value': 'foo@domain.tld', {}, []);
 *     const el = inp();
 *
 *     const serialized = serializeInput(el);  // => {email: 'foo@domain.tld'}
 *
 */
export const serializeInput = ifElse(
  isDisabled,
  makeNewObj,
  ifElse(
    isFile,
    serializeFile,
    ifElse(
      isCheckbox,
      serializeCheckbox,
      ifElse(
        isRadio,
        serializeRadio,
        fn2(obj, inputName, inputValue)
      )
    )
  )
);


/**
 * Reducer function used to serialize a form.
 * Takes an object `acc` holding accumulated input values and an element `el`
 * as an arguments and returns newly created object, holding accumulated
 * values from `acc` and serialized value of `el` input.
 *
 * Uses `Object.assign` to create new object to return.
 * Keeps `acc` object untouched.
 *
 * @function
 * @category Form
 *
 * @param {Object} acc accumulated serialized input values
 * @param {Element} el input element to serialize
 * @returns {Object} newly created object, holding accumulated values from
 * `acc` and serialized value of `el`
 *
 * @private
 *
 */
function serializeFormReducer(acc, el) {
  return Object.assign({}, acc, serializeInput(el));
}


/**
 * Takes a form element `el` and returns an object holding serialized
 * representation of form.
 * Supports serialization of `input`, `textarea` and `select` elements.
 * Returns serialization values for elements with `name` attribute only
 * (elements without `name` attribute will be skipped from serialization).
 *
 * @function
 * @category Form
 *
 * @param {Element} el form element
 * @returns {Object} serialized representation of form
 *
 * @example
 *
 *     import {serializeForm, h} from '@yagni-js/yagni-dom';
 *
 *     const form = dom.h('form', {}, {}, [
 *       dom.h('input', {type: 'text', name: 'aaa', value: ''}, {}, []),
 *       dom.h('input', {type: 'text', name: 'bbb', value: 'bbb'}, {}, []),
 *       dom.h('input', {type: 'password', name: 'ccc', value: 'ccc'}, {}, []),
 *       dom.h('input', {type: 'hidden', name: 'ddd', value: 'ddd'}, {}, []),
 *       dom.h('input', {type: 'file', name: 'eee', value: 'eee'}, {}, []),
 *       dom.h('input', {type: 'checkbox', name: 'fff'}, {}, []),
 *       dom.h('input', {type: 'checkbox', name: 'ggg', checked: 'checked'}, {}, []),
 *       dom.h('input', {type: 'radio', name: 'hhh', value: 'h'}, {}, []),
 *       dom.h('input', {type: 'radio', name: 'hhh', value: 'hh'}, {}, []),
 *       dom.h('input', {type: 'radio', name: 'hhh', checked: 'checked', value: 'hhh'}, {}, []),
 *       dom.h('input', {type: 'text', name: 'iii', value: 'iii', disabled: 'disabled'}, {}, []),
 *       dom.h('input', {name: 'jjj', value: 'jjj'}, {}, []),
 *       dom.h('textarea', {name: 'kkk'}, {}, [dom.hText('kkk')]),
 *       dom.h('select', {name: 'lll'}, {}, [
 *         dom.h('option', {value: 'foo'}, {}, [dom.hText('foo')]),
 *         dom.h('option', {value: 'baz'}, {}, [dom.hText('baz')]),
 *         dom.h('option', {value: 'lll'}, {selected: true}, [dom.hText('lll')]),
 *         dom.h('option', {value: 'bar'}, {}, [dom.hText('bar')])
 *       ])
 *     ]);
 *
 *     const el = form();
 *
 *     const serialized = serializeForm(el);
 *     // => {
 *             aaa: '',
 *             bbb: 'bbb',
 *             ccc: 'ccc',
 *             ddd: 'ddd',
 *             ggg: true,
 *             hhh: 'hhh',
 *             jjj: 'jjj',
 *             kkk: 'kkk',
 *             lll: 'lll'
 *           }
 *
 */
export const serializeForm = pipe([
  query('input[name],textarea[name],select[name]'),
  call(reduce(serializeFormReducer), makeNewObj)
]);


/**
 * Takes an input element `el` as an argument, sets its `disabled` property
 * to `true` and returns `el` back.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Element} passed in input element `el`
 *
 * @example
 *
 *     import {setInputDisabled, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {}, {disabled: false}, []);
 *
 *     const el = inp();
 *
 *     const before = el.disabled;        // => false
 *
 *     const res = setInputDisabled(el);  // => res is el
 *
 *     const after = el.disabled;         // => true
 *
 */
export const setInputDisabled = setProp('disabled', true);


/**
 * Takes an input element `el` as an argument, sets its `disabled` property
 * to `false` and returns `el` back.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Element} passed in input element `el`
 *
 * @example
 *
 *     import {setInputEnabled, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {}, {disabled: true}, []);
 *
 *     const el = inp();
 *
 *     const before = el.disabled;        // => true
 *
 *     const res = setInputEnabled(el);   // => res is el
 *
 *     const after = el.disabled;         // => false
 *
 */
export const setInputEnabled = setProp('disabled', false);


/**
 * Takes an input element `el` as an argument, sets its `readOnly` property
 * to `true` and returns `el` back.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Element} passed in input element `el`
 *
 * @example
 *
 *     import {setInputReadonly, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {}, {}, []);
 *
 *     const el = inp();
 *
 *     const before = el.readOnly;        // => false
 *
 *     const res = setInputReadonly(el);  // => res is el
 *
 *     const after = el.readOnly;         // => true
 *
 */
export const setInputReadonly = setProp('readOnly', true);


/**
 * Takes an input element `el` as an argument, sets its `readOnly` property
 * to `false` and returns `el` back.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Element} passed in input element `el`
 *
 * @example
 *
 *     import {setInputEditable, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {}, {readOnly: true}, []);
 *
 *     const el = inp();
 *
 *     const before = el.readOnly;        // => true
 *
 *     const res = setInputEditable(el);  // => res is el
 *
 *     const after = el.readOnly;         // => false
 *
 */
export const setInputEditable = setProp('readOnly', false);


/**
 * Takes an input element `el` as an argument and returns result of calling
 * `checkValidity` method of `el`.
 *
 * @function
 * @category Form
 *
 * @param {Element} el input element
 * @returns {Boolean} result of `checkValidity` method call
 *
 * @example
 *
 *     import {isInputValid, h} from '@yagni-js/yagni-dom';
 *
 *     const inp = h('input', {}, {required: true}, []);
 *
 *     const el = inp();
 *
 *     const isValid = isInputValid(el);  // => false
 *
 */
export const isInputValid = callMethod(identity, 'checkValidity');
