// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__';

let _global = (typeof window !== 'undefined' && window) || process;

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
 * shallow merge; it will not create new cloned values for target members.
 *
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export function assign(target: any, ...args): any {
  return filteredAssign.apply(this, [null, target].concat(args));
}

/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @params filteredAssign {Function} A callback function that tests if the property should be assigned.
 * @params target {Object} Target object to merge following object arguments into.
 * @params args {Object} One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args) {
  target = target || {};

  for (let sourceObject of args) {
    if (sourceObject) {
      for (let propName in sourceObject) {
        if (sourceObject.hasOwnProperty(propName) &&
          !isAllowed || isAllowed(propName)) {
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
