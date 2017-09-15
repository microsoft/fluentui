// Initialize global window id.
const CURRENT_ID_PROPERTY = '__currentId__';

declare const process: any;

let _global = (typeof window !== 'undefined' && window) || process;

if (_global[CURRENT_ID_PROPERTY] === undefined) {
  _global[CURRENT_ID_PROPERTY] = 0;
}

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
export function shallowCompare(a: any, b: any): boolean {
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

/* Takes and enum and iterates over each value of the enum (as a string), running the callback on each, returning a mapped array.
 * The callback takes as a first parameter the string that represents the name of the entry, and the second parameter is the
 * value of that entry, which is the value you'd normally use when using the enum (usually a number).
 * */
export function mapEnumByName<T>(theEnum: any, callback: (name?: string, value?: any) => T): T[] | undefined {
  // map<any> to satisfy compiler since it doesn't realize we strip out undefineds in the .filter() call
  return Object.keys(theEnum).map<any>((p: string) => { // map on each property name as a string
    if (String(Number(p)) !== p) { // if the property is not just a number (because enums in TypeScript will map both ways)
      return callback(p, theEnum[p]);
    }
  }).filter((v: any) => !!v); // only return elements with values
}