
import { flatten } from 'yagni';


export function h(tagName, attrs, props, children) {
  return {
    tagName: tagName,
    attrs: attrs,
    props: props,
    children: flatten(children)
  };
}
