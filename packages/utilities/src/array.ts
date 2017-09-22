/**
 * Helper to find the index of an item within an array, using a callback to
 * determine the match.
 *
 * @public
 * @param array - Array to search.
 * @param cb - Callback which returns true on matches.
 */
export function findIndex<T>(array: T[], cb: (item: T, index: number) => boolean): number {
  let index = -1;

  for (let i = 0; array && i < array.length; i++) {
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
 * @returns {any[][]} - A matrix of items
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
 * Takes an array, creates a copy, and applies a mutation function on the copy, returning the modified copy.
 * This can be used to transform a function that mutates an array into one that returns a modified copy instead.
 * @param array - Array to me manipulated
 * @param mutateFunction - The function that will mutate the copied array
 */
function copyAndMutateArray<T>(array: T[], mutateFunction: (arr: T[]) => void): T[] {
  const copy = array.slice();
  mutateFunction(copy);
  return copy;
}

/**
 * Given an array, this function returns a new array where the element at a given index has been replaced.
 * @param array - The array to operate on
 * @param newElement - The element that will be placed in the new array
 * @param index - The index of the element that should be replaced
 */
export function replaceElement<T>(array: T[], newElement: T, index: number): T[] {
  return copyAndMutateArray(array, (arr: T[]): void => { arr[index] = newElement; });
}

/**
 * Given an array, this function returns a new array where an element has been inserted at the given index.
 * @param array - The array to operate on
 * @param index - The index where an element should be inserted
 * @param itemToAdd - The element to insert
 */
export function addElementAtIndex<T>(array: T[], index: number, itemToAdd: T): T[] {
  return copyAndMutateArray(array, (arr: T[]): void => { arr.splice(index, 0, itemToAdd); });
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