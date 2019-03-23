# Changelog


## 2.1.0 (2019-03-23)

- [*] updated dependencies


## 2.0.0 (2019-02-26)

### Changes

- [+] added `hSkip()` function to indicate node to skip while creating children
    nodes in `h()` and `hSVG()` functions
- [*] `@yagni-js/yagni-dom@1.0.0` and `@yagni-js/yagni-dom@1.1.0` are
    deprecated in favour of `@yagni-js/yagni-dom@2.0.0`


## 1.1.0 (2019-02-22)

### Changes

- [*] fixed readme and jsdoc examples - removed `hToDOM()` function mentions,
    added `hText()` function to examples


## 1.0.0 (2019-02-21)

### Breaking changes

- [*] changed `h()` and `hSVG()` functions to return a factory function,
    require array of children to contain only functions to call
    to create child element or text node
- [-] removed `hToDOM()` function

### Changes

- [+] added support for `HTMLSelectElement` to `serializeForm()` function
- [+] added `setAttrTo()` function
- [+] added `setPropTo()` function
- [+] added `setDataTo()` function
- [+] added `removeChild()` function
- [+] added `hText()` function
- [*] tuned `setAttrs()`, `setProps()` and `setDatas()` functions
- [*] updated deps
- [+] added jsdoc comments


## 0.3.0 (2018-03-10)

- added `prepend()` and `prependTo()` functions


## 0.2.0 (2018-03-06)

- updated `@yagni-js/yagni@0.3.0` peer dependency


## 0.1.2 (2018-02-24)

- `@yagni-js/yagni` moved to peer dependencies in package.json


## 0.1.1 (2018-02-18)

- switched from MIT to Unlicense


## 0.1.0 (2018-02-18)

- initial release
