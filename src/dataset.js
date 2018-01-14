
import { camelize, items, mutate, pickPath, pipe, reduce, tap } from 'yagni';


export function getData(name) {
  return pickPath(['dataset', camelize(name)]);
}

export function setData(name, value) {
  return tap(
    function (el) {
      return mutate(el.dataset, camelize(name), value)
    }
  );
}

// el: DOM element
// spec: {key: 'key', value: 'value'}
function setDataSpec(el, spec) {
  return setData(spec.key, spec.value)(el);
}

// datas: {name1: 'value1', name2: 'value2', ...}
export function setDatas(datas) {
  const ops = pipe([
    items,
    reduce(setDataSpec)
  ]);
  return ops(datas);
}
