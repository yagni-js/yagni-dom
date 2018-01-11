
import { doc } from './globals.js';


export function createElement(tagName) {
  return doc.createElement(tagName);
}

export function createElementNS(namespace) {
  return function (tagName) {
    return doc.createElementNS(namespace, tagName);
  };
}

export function createText(text) {
  return doc.createTextNode(text);
}
