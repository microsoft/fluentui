/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 * @param fromIndex - Optional index to start from (defaults to 0)
 */
export function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean, fromIndex: number = 0): number {
  let index = -1;

  for (let i = fromIndex; array && i < array.length; i++) {
    if (cb(array[i], i)) {
      index = i;
      break;
    }
  }

  return index;
}

/**
 * Helper to find the first item within an array that satisfies the callback.
 * @param array - Array to search
 * @param cb - Callback which returns true on matches
 */
export function find<T>(array: T[], cb: (item: T, index: number) => boolean): T | undefined {
  let index = findIndex(array, cb);

  if (index < 0) {
    return undefined;
  }

  return array[index];
}

/**
 * Creates an array of a given size and helper method to populate.
 *
 * @public
 * @param size - Size of array.
 * @param getItem - Callback to populate given cell index.
 */
export function createArray<T>(size: number, getItem: (index: number) => T): T[] {
  let array: T[] = [];

  for (let i = 0; i < size; i++) {
    array.push(getItem(i));
  }

  return array;
}

/**
 * Convert the given array to a matrix with columnCount number
 * of columns.
 *
 * @public
 * @param items - The array to convert
 * @param columnCount - The number of columns for the resulting matrix
 * @returns A matrix of items
 */
export function toMatrix<T>(items: T[], columnCount: number): T[][] {
  return items.reduce((rows: T[][], currentValue: T, index: number) => {
    if (index % columnCount === 0) {
      rows.push([currentValue]);
    } else {
      rows[rows.length - 1].push(currentValue);
    }
    return rows;
  }, [] as T[][]);
}

/**
 * Given an array, it returns a new array that does not contain the item at the given index.
 * @param array - The array to operate on
 * @param index - The index of the element to remove
 */
export function removeIndex<T>(array: T[], index: number): T[] {
  return array.filter((_: T, i: number) => index !== i);
}

/**
 * Given an array, this function returns a new array where the element at a given index has been replaced.
 * @param array - The array to operate on
 * @param newElement - The element that will be placed in the new array
 * @param index - The index of the element that should be replaced
 */
export function replaceElement<T>(array: T[], newElement: T, index: number): T[] {
  const copy = array.slice();
  copy[index] = newElement;
  return copy;
}

/**
 * Given an array, this function returns a new array where an element has been inserted at the given index.
 * @param array - The array to operate on
 * @param index - The index where an element should be inserted
 * @param itemToAdd - The element to insert
 */
export function addElementAtIndex<T>(array: T[], index: number, itemToAdd: T): T[] {
  const copy = array.slice();
  copy.splice(index, 0, itemToAdd);
  return copy;
}

/**
 * Given an array where each element is of type T or T[], flatten it into an array of T
 * @param array - The array where each element can optionally also be an array
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  let result: T[] = [];
  array.forEach((item: T | T[]): T[] => (result = result.concat(item)));
  return result;
}

/**
 * Returns a boolean indicating if the two given arrays are equal in length and values.
 *
 * @param array1 - First array to compare
 * @param array2 - Second array to compare
 * @returns True if the arrays are the same length and have the same values in the same positions, false otherwise.
 */
export function arraysEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}
