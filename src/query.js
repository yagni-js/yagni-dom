
export function matches(selector) {
  return function (el) {
    return el.matches(selector);
  };
}

export function closest(selector) {
  return function (el) {
    return el.closest(selector);
  };
}
