// Copied from @microsoft/fast-web-utilities

/**
 * Returns the index of the last element in the array where predicate is true, and -1 otherwise.
 *
 * @param array - the array to test
 * @param predicate - find calls predicate once for each element of the array, in descending order, until it finds one where predicate returns true. If such an element is found, findLastIndex immediately returns that element index. Otherwise, findIndex returns -1.
 */
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => unknown): number {
  let k = array.length;
  while (k--) {
    if (predicate(array[k], k, array)) {
      return k;
    }
  }

  return -1;
}
