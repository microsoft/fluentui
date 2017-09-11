// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__';

declare const process: {};

// tslint:disable-next-line:no-any
let _global: any = (typeof window !== 'undefined' && window) || process;

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0;
}

// tslint:disable-next-line:no-any
function checkProperties(a: any, b: any): boolean {
  for (let propName in a) {
    if (a.hasOwnProperty(propName)) {
      if (!b.hasOwnProperty(propName) || (b[propName] !== a[propName])) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Compares a to b and b to a.
 *
 * @public
 */
export function shallowCompare<TA, TB>(a: TA, b: TB): boolean {
  return checkProperties(a, b) && checkProperties(b, a);
}

/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @public
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any
export function assign(target: any, ...args: any[]): any {
  return filteredAssign.apply(this, [null, target].concat(args));
}

/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @public
 * @param isAllowed - Callback to determine if the given propName is allowed in the result.
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
// tslint:disable-next-line:no-any
export function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any {
  target = target || {};

  for (let sourceObject of args) {
    if (sourceObject) {
      for (let propName in sourceObject) {
        if (
          sourceObject.hasOwnProperty(propName) &&
          (!isAllowed || isAllowed(propName))
        ) {
          target[propName] = sourceObject[propName];
        }
      }
    }
  }

  return target;
}

/**
 * Generates a unique id in the global scope (this spans across duplicate copies of the same library.)
 *
 * @public
 */
export function getId(prefix?: string): string {
  let index = _global[CURRENT_ID_PROPERTY]++;

  return (prefix || '') + index;
}
