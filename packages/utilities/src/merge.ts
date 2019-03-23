/**
 * Simple deep merge function. Takes all arguments and returns a deep copy of the objects merged
 * together in the order provided. If an object creates a circular reference, it will assign the
 * original reference.
 */
export function merge<T = {}>(target: Partial<T>, ...args: (Partial<T> | null | undefined | false)[]): T {
  for (const arg of args) {
    _merge(target || {}, arg);
  }

  return target as T;
}

/**
 * The _merge helper iterates through all props on source and assigns them to target.
 * When the value is an object, we will create a deep clone of the object. However if
 * there is a circular reference, the value will not be deep cloned and will persist
 * the reference.
 */
// tslint:disable-next-line:no-any
function _merge<T>(target: T, source: T, circularReferences: any[] = []): T {
  circularReferences.push(source);

  for (let name in source) {
    if (source.hasOwnProperty(name)) {
      const value = source[name];

      if (typeof value === 'object') {
        const isCircularReference = circularReferences.indexOf(value) > -1;

        // tslint:disable-next-line:no-any
        (target as any)[name] = isCircularReference ? value : _merge(target[name] || {}, value, circularReferences);
      } else {
        target[name] = value;
      }
    }
  }

  circularReferences.pop();

  return target;
}
