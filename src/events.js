
import { tap } from 'yagni';


// spec: {event: 'click', handler: function () {}}
export function addListener(spec) {
  return tap(function (el) {
    return el.addEventListener(spec.event, spec.handler, false);
  });
}

// spec: {event: 'click', handler: function () {}}
export function removeListener(spec) {
  return tap(function (el) {
    return el.removeEventListener(spec.event, spec.handler, false);
  });
}
