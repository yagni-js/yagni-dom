
import { mutate, pick, reduceObj } from '@yagni-js/yagni';


export const getProp = pick;


const setProperty = mutate;


export function setProp(name, value) {
  return function _setProp(el) {
    return setProperty(el, name, value);
  };
}


export function setPropTo(el) {
  return function _setPropTo(name, value) {
    return setProperty(el, name, value);
  };
}


// props: {prop1: 'value1', prop2: 'value2', ...}
export const setProps = reduceObj(setProperty);


export const textContent = getProp('textContent');
