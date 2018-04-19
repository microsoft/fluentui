/**
 * Checks if the first and second items are the same, recursively. Use for checking arrays and objects.
 *
 * @param itemA First item to compare to second item
 * @param itemB Second item to compare to first item
 * @returns {boolean} True if items are the same or false if not.
 */
export const isEqual = (itemA: any, itemB: any): boolean => { // tslint:disable-line no-any
  // First, a simple check for strings and numbers
  if (typeof itemA === 'string' || typeof itemA === 'number') {
    if (itemA === itemB) {
      return true;
    }
    return false;
  }
  // Get the value type
  const type = Object.prototype.toString.call(itemA);
  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(itemB)) {
    return false;
  }
  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
    return false;
  }
  // Compare the length of the length of the two items
  const valueLen = type === '[object Array]' ? itemA.length : Object.keys(itemA).length;
  const otherLen = type === '[object Array]' ? itemB.length : Object.keys(itemB).length;
  if (valueLen !== otherLen) {
    return false;
  }
  // Compare two items
  const compare = (item1: any, item2: any) => {  // tslint:disable-line no-any
    // Get the object type
    const itemType = Object.prototype.toString.call(item1);
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) {
        return false;
      }
    }
    // If the two items are not the same type, return false
    if (itemType !== Object.prototype.toString.call(item2)) {
      return false;
    }
    // Else if it's a function, convert to a string and compare
    // Otherwise, just compare
    if (itemType === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        return false;
      }
    }
    if (item1 !== item2) {
      return false;
    }
  };
  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(itemA[i], itemB[i]) === false) {
        return false;
      }
    }
  }
  for (const key in itemA) {
    if (itemA.hasOwnProperty(key)) {
      if (compare(itemA[key], itemB[key]) === false) {
        return false;
      }
    }
  }
  // If nothing failed, return true
  return true;
};

/**
 * Checks if the first and second items are NOT the same, recursively. Use for checking arrays and objects.
 *
 * @param itemA First item to compare to second item
 * @param itemB Second item to compare to first item
 * @returns {boolean} True if items are NOT the same or false if they are.
 */
export const isNotEqual = (itemA: any, itemB: any): boolean => { // tslint:disable-line no-any
  return !isEqual(itemA, itemB);
};
