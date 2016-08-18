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

// Assign function.
export function assign(target: any, ...args) {
  target = target || {};

  for (let sourceObject of args) {
    if (sourceObject) {
      for (let propName in sourceObject) {
        if (sourceObject.hasOwnProperty(propName)) {
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
