/**
 * @internal
 */
export function binarySearch<T>(
  valuesToSearch: T[] | ReadonlyArray<T>,
  searchCondition: (value: T) => boolean,
  startIndex: number = 0,
  endIndex: number = valuesToSearch.length - 1,
): T {
  if (endIndex === startIndex) {
    return valuesToSearch[startIndex];
  }

  const middleIndex: number = Math.floor((endIndex - startIndex) / 2) + startIndex;

  // Check to see if this passes on the item in the center of the array
  // if it does check the previous values
  return searchCondition(valuesToSearch[middleIndex])
    ? binarySearch(
        valuesToSearch,
        searchCondition,
        startIndex,
        middleIndex, // include this index because it passed the search condition
      )
    : binarySearch(
        valuesToSearch,
        searchCondition,
        middleIndex + 1, // exclude this index because it failed the search condition
        endIndex,
      );
}
