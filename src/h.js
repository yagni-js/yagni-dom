
import { always, call, identity, ifElse, isArray, isString, pipe, reduce } from '@yagni-js/yagni';

import { setAttrs } from './attrs.js';
import { createElement, createSVGElement, createText } from './create.js';
import { setProps } from './props.js';
import { appendAfter, removeChildren, replace } from './mutate.js';


export function h(tagName, attrs, props, children) {
  return pipe([
    always(tagName),
    createElement,
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}

export function hSVG(tagName, attrs, props, children) {
  return pipe([
    always(tagName),
    createSVGElement,
    setAttrs(attrs),
    setProps(props),
    createChildren(children)
  ]);
}

function createChild(target, smth) {
  const el = isString(smth) ? createText(smth) : smth();
  // NB. side effect - unused assignment
  const child = target.appendChild(el);
  return target
}

function createChildren(children) {
  return function _createChildren(target) {
    return children.reduce(
      function __createChildren(el, item) {
        return isArray(item) ? item.reduce(__createChildren, el) : createChild(el, item);
      },
      target
    );
  };
}

export function render(target) {
  return function (smth) {
    return createChild(target, smth);
  };
}

export function renderAfter(target) {
  return pipe([
    call(identity),
    appendAfter(target)
  ]);
}

export function renderC(target) {
  return function (smth) {
    return createChild(removeChildren(target), smth);
  };
}

export function renderR(target) {
  return pipe([
    call(identity),
    replace(target)
  ]);
}
