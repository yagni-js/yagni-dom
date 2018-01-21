
import {always, call, callMethod, equals, identity, ifElse, isNil, obj, or, pipe, reduce } from 'yagni';

import { query } from './query.js';
import { getProp } from './props.js';


const inputName = getProp('name');
const inputValue = getProp('value');
const inputTypeProperty = getProp('type');

const isChecked = getProp('checked');
const isDisabled = getProp('disabled');

export const inputType = pipe([
  inputTypeProperty,
  ifElse(
    isNil,
    always('text'),
    callMethod(identity, 'toLowerCase')
  )
]);

const isFile = equals('file');
const isCheckbox = equals('checkbox');
const isRadio = equals('radio');
const isBoolean = pipe([
  inputType,
  or(isCheckbox, isRadio)
]);

export function serializeInput(el) {
  // TODO use pipe + transform + ifElse?
  const isBooleanInput = isBoolean(el);
  const isFileInput = isFile(el);
  const isInputDisabled = isDisabled(el);

  const name = inputName(el);
  const value = isBooleanInput ? isChecked(el) : inputValue(el);

  return isInputDisabled || isFileInput || (isBooleanInput && !value) ? {} : obj(name, value);
}

function serializeFormReducer(acc, el) {
  return Object.assign({}, acc, serializeInput(el));
}

export const serializeForm = pipe([
  query('input[name]'),
  call(reduce(serializeFormReducer), always({}))
]);
