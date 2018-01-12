
import { doc } from './globals.js';


export function createElement(tagName) {
  return doc.createElement(tagName);
}

export function createElementNS(namespace) {
  return function (tagName) {
    return doc.createElementNS(namespace, tagName);
  };
}

export const createSVGElement = createElementNS('http://www.w3.org/2000/svg');

export function createText(text) {
  return doc.createTextNode(text);
}
