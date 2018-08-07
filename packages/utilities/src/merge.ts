/**
 * Simple deep merge function. Takes all arguments are returns a new object which merges
 * them all, in the order provided.
 */
export function merge<T = {}>(...args: Partial<T | null | undefined | false>[]): T {
  // tslint:disable-next-line:no-any
  const target: any = {};

  for (const arg of args) {
    _merge(target, arg);
  }

  return target as T;
}

function _merge<T>(target: T, source: T): T {
  for (let name in source) {
    if (source.hasOwnProperty(name)) {
      const value = source[name];

      if (typeof value === 'object') {
        target[name] = merge(target[name], source[name]);
      } else {
        target[name] = value;
      }
    }
  }

  return target;
}
