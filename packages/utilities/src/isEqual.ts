// tslint:disable-next-line no-any
export const isEqual = (itemA: any, itemB: any): boolean => {
  if (itemA === itemB) {
    return true;
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
  // tslint:disable-next-line no-any
  const compare = (item1: any, item2: any) => {

    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) {
        return false;
      }
    } else {

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
      } else {
        if (item1 !== item2) {
          return false;
        }
      }

    }
  };
  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(itemA[i], itemB[i]) === false) {
        return false;
      }
    }
  } else {
    for (const key in itemA) {
      if (itemA.hasOwnProperty(key)) {
        if (compare(itemA[key], itemB[key]) === false) {
          return false;
        }
      }
    }
  }
  // If nothing failed, return true
  return true;
};

/**
 * Checks if the first and second array|object are the NOT same recursively. Use for checking arrays and objects.
 * @param itemA First array|object to compare to second array|object
 * @param itemB Second array|object to compare to first array|object
 */
export const isNotEqual = (itemA: any, itemB: any): boolean => { // tslint:disable-line no-any
  return !isEqual(itemA, itemB);
};