
import { pipe, pick, callMethod, tap, identity } from 'yagni';


function classListOp(method) {
  return function (classname) {
    return tap(
      pipe([
        pick('classList'),
        callMethod(identity, method, classname)
      ])
    );
  };
}

export const addClass = classListOp('add');
export const removeClass = classListOp('remove');
export const toggleClass = classListOp('toggle');

export function hasClass(classname) {
  return pipe([
    pick('classList'),
    callMethod(identity, 'contains', classname)
  ]);
}
