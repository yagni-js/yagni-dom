
import { isDefined, reduceObj, tap } from '@yagni-js/yagni';


export function getAttr(name) {
  return function _getAttr(el) {
    return el.getAttribute(name);
  };
}

function setAttribute(el, name, value) {
  // NB. side effect
  const res = isDefined(value) ? el.setAttribute(name, value) : el;
  return el;
}

export function setAttr(name, value) {
  return function _setAttr(el) {
    return setAttribute(el, name, value);
  };
}

export function setAttrTo(el) {
  return function _setAttrTo(name, value) {
    return setAttribute(el, name, value);
  };
}


// attrs: {attr1: 'value1', attr2: 'value2', ...}
export const setAttrs = reduceObj(setAttribute);


export function removeAttr(name) {
  return tap(
    function _removeAttr(el) {
      return el.removeAttribute(name);
    }
  );
}
