/**
 * The original source of the descendants uses ES2017 functionality
 * https://github.com/reach/reach-ui/tree/develop/packages/descendants
 *
 * Since >ES2015 support is still unsure, putting some temporary polyfills inline for now
 */

export function arrayFind<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  // eslint-disable-next-line eqeqeq
  if (array == null) {
    throw TypeError('array cannot be null or undefined');
  }

  // eslint-disable-next-line eqeqeq
  if (predicate == null || typeof predicate !== 'function') {
    throw TypeError('predicate must be a function');
  }

  let i = 0;
  const len = array.length;
  while (i < len) {
    if (predicate(array[i])) {
      return array[i];
    }

    i++;
  }

  return undefined;
}

export function arrayFindIndex<T>(array: T[], predicate: (item: T) => boolean): number {
  // eslint-disable-next-line eqeqeq
  if (array == null) {
    throw TypeError('array cannot be null or undefined');
  }

  // eslint-disable-next-line eqeqeq
  if (predicate == null || typeof predicate !== 'function') {
    throw TypeError('predicate must be a function');
  }

  let i = 0;
  const len = array.length;
  while (i < len) {
    if (predicate(array[i])) {
      return i;
    }

    i++;
  }

  return -1;
}

export function arrayIncludes<T>(array: T[], item: T): boolean {
  return array.indexOf(item) !== -1;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectValues(obj: any): any[] {
  return Object.keys(obj).map(key => obj[key]);
}
