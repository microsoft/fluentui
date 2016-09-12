// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__';

let _global = window || process;

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0;
}

function checkProperties(a, b) {
  for (let propName in a) {
    if (a.hasOwnProperty(propName)) {
      if (!b.hasOwnProperty(propName) || (b[propName] !== a[propName])) {
        return false;
      }
    }
  }

  return true;
}

// Compare a to b and b to a
export function shallowCompare(a, b) {
  return checkProperties(a, b) && checkProperties(b, a);
}

/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for object members.
 *
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export function assign(target: any, ...args): any {
  return assignExcept.apply(this, [ null, target ].concat(args));
}

/**
 * Makes a resulting merge of a bunch of objects, but avoids copying a list of member names. Pass
 * in the target object followed by 1 or more  objects as arguments and they will be merged sequentially
 * into the target. Note that this will shallow merge; it will not create new cloned values for object members.
 *
 * @params exceptions {string[]} A list of parameters that should not be mixed into the target.
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export function assignExcept(exceptions: string[], target: any, ...args) {
  target = target || {};

  for (let sourceObject of args) {
    if (sourceObject) {
      for (let propName in sourceObject) {
        if (sourceObject.hasOwnProperty(propName) &&
            !exceptions || exceptions.indexOf(propName) === -1) {
          target[propName] = sourceObject[propName];
        }
      }
    }
  }

  return target;
}

/** Generates a unique id in the global scope (this spans across duplicate copies of the same library.) */
export function getId(prefix?: string): string {
  let index = _global[CURRENT_ID_PROPERTY]++;

  return (prefix || '') + index;
}
