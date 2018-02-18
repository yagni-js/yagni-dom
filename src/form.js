
import {always, call, callMethod, equals, fn2, identity, ifElse, obj, pipe, reduce } from '@yagni-js/yagni';

import { query } from './query.js';
import { getProp, setProp } from './props.js';


const inputName = getProp('name');
const inputValue = getProp('value');
export const inputType = getProp('type');

const isChecked = getProp('checked');
const isDisabled = getProp('disabled');

const isFile = pipe([
  inputType,
  equals('file')
]);
const isCheckbox = pipe([
  inputType,
  equals('checkbox')
]);
const isRadio = pipe([
  inputType,
  equals('radio')
]);

function serializeRadio(el) {
  return isChecked(el) ? obj(inputName(el), inputValue(el)) : {};
}
function serializeCheckbox(el) {
  return isChecked(el) ? obj(inputName(el), true) : {};
}
function serializeFile(el) {
  return {};
}

export const serializeInput = ifElse(
  isDisabled,
  always({}),
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

function serializeFormReducer(acc, el) {
  return Object.assign({}, acc, serializeInput(el));
}

export const serializeForm = pipe([
  // TODO: HTMLSelectElement
  query('input[name],textarea[name]'),
  call(reduce(serializeFormReducer), always({}))
]);

export const setInputDisabled = setProp('disabled', true);
export const setInputEnabled = setProp('disabled', false);

export const setInputReadonly = setProp('readOnly', true);
export const setInputEditable = setProp('readOnly', false);

export const isInputValid = callMethod(identity, 'checkValidity');
