
import { camelize, mutate, pickPath, reduceObj } from '@yagni-js/yagni';


export function getData(name) {
  return pickPath(['dataset', camelize(name)]);
}

function setDataset(el, name, value) {
  // NB. side effect
  const res = mutate(el.dataset, camelize(name), value);
  return el;
}

export function setData(name, value) {
  return function _setData(el) {
    return setDataset(el, name, value);
  };
}


export function setDataTo(el) {
  return function _setDataTo(name, value) {
    return setDataset(el, name, value);
  };
}

// datas: {name1: 'value1', name2: 'value2', ...}
export const setDatas = reduceObj(setDataset);
