/**
 * Simple deep merge function. Takes all arguments and returns a deep copy of the objects merged
 * together in the order provided. If an object creates a circular reference, it will assign the
 * original reference.
 */
export function merge<T = {}>(target: Partial<T>, ...args: (Partial<T> | null | undefined | false)[]): T {
  for (const arg of args) {
    _merge(target || {}, arg as Partial<T>);
  }

  return target as T;
}

/**
 * The _merge helper iterates through all props on source and assigns them to target.
 * When the value is an object, we will create a deep clone of the object. However if
 * there is a circular reference, the value will not be deep cloned and will persist
 * the reference.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _merge<T extends Object>(target: T, source: T, circularReferences: any[] = []): T {
  circularReferences.push(source);

  for (let name in source) {
    if (source.hasOwnProperty(name)) {
      if (name !== '__proto__' && name !== 'constructor' && name !== 'prototype') {
        const value: T[Extract<keyof T, string>] = source[name];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const isCircularReference = circularReferences.indexOf(value) > -1;
          target[name] = (
            isCircularReference ? value : _merge(target[name] || {}, value, circularReferences)
          ) as T[Extract<keyof T, string>];
        } else {
          target[name] = value;
        }
      }
    }
  }

  circularReferences.pop();

  return target;
}
