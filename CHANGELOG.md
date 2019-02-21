# Changelog


## 1.0.0 (2019-02-21)

### Breaking changes

- [*] change `h()` and `hSVG()` functions to return a factory function, require
    array of children to contain only functions to call to create child element
    or text node
- [-] remove `hToDOM()` function

### Changes

- [+] add support for `HTMLSelectElement` to `serializeForm()` function
- [+] add `setAttrTo()` function
- [+] add `setPropTo()` function
- [+] add `setDataTo()` function
- [+] add `removeChild()` function
- [+] add `hText()` function
- [*] tune `setAttrs()`, `setProps()` and `setDatas()` functions
- [*] update deps
- [+] add jsdoc comments


## 0.3.0 (2018-03-10)

- add `prepend()` and `prependTo()` functions


## 0.2.0 (2018-03-06)

- update peer dependency `@yagni-js/yagni@0.3.0`


## 0.1.2 (2018-02-24)

- move `@yagni-js/yagni` to peer dependencies in package.json


## 0.1.1 (2018-02-18)

- switch from MIT to Unlicense


## 0.1.0 (2018-02-18)

- initial release
