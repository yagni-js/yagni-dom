
import { items, mutate, pick, pipe, reduce } from 'yagni';


export const getProp = pick;


export function setProp(name, value) {
  return function (el) {
    return mutate(el, name, value);
  };
}

// el: DOM element
// spec: {key: 'key', value: 'value'}
function setPropSpec(el, spec) {
  return setProp(spec.key, spec.value)(el);
}

// props: {prop1: 'value1', prop2: 'value2', ...}
export function setProps(props) {
  const ops = pipe([
    items,
    reduce(setPropSpec)
  ]);
  return ops(props);
}
