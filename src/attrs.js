
import { isDefined, pick, pipe, items, filter, reduce, tap } from '@yagni-js/yagni';


export function getAttr(name) {
  return function (el) {
    return el.getAttribute(name);
  };
}

export function setAttr(name, value) {
  return tap(
    function (el) {
      return el.setAttribute(name, value);
    }
  );
}

// el: DOM element
// spec: {key: 'key', value: 'value'}
function setAttrSpec(el, spec) {
  return setAttr(spec.key, spec.value)(el);
}

// attrs: {attr1: 'value1', attr2: 'value2', ...}
export function setAttrs(attrs) {
  const hasValue = pipe([pick('value'), isDefined]);
  const ops = pipe([
    items,
    filter(hasValue),
    reduce(setAttrSpec)
  ]);
  return ops(attrs);
}

export function removeAttr(name) {
  return tap(
    function (el) {
      return el.removeAttribute(name);
    }
  );
}
