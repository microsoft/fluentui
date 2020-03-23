import * as _ from 'lodash';

/**
 * Check whether source includes target ignoring case.
 */
export const includes = (source: string, target: string): boolean =>
  _.toLower(source).indexOf(_.toLower(target)) !== -1;

/**
 * Checks whether the key or the value of data[key] contains the search string.
 */
export const find = (data: object, key: string, search: string): boolean => {
  const value = data[key];
  return (
    search !== '' &&
    (includes(key, search) || (typeof value !== 'object' && !_.isNil(value) && includes(value, search)))
  );
};

/**
 * Checks if the data[key] is primitive and override in the overrides object.
 */
export const isOverridden = (data: object, key: string, overrides: object): boolean => {
  return typeof data[key] !== 'object' && !!overrides && overrides[key] !== null && overrides[key] !== undefined;
};

/**
 * Helper recursive function for the filter method.
 */
const filterR = (search: string, data: object): boolean => {
  let result = false;

  Object.keys(data).forEach(key => {
    const value = data[key];

    if (find(data, key, search)) {
      result = true;
    }

    // If the value is object invoke again
    if (typeof value === 'object' && filterR(search, value)) {
      result = true;
    }
  });

  return result;
};

/**
 * Filters the data for the value string (if it appears in the key or value). Considers nested objects.
 */
export const filter = (data: object, value: string) => {
  return Object.keys(data)
    .filter(key => {
      if (find(data, key, value)) {
        return true;
      }

      // if the value is object invoke again
      if (typeof data[key] === 'object' && data[key] !== null) {
        return filterR(value, data[key]);
      }

      return false;
    })
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
};

/**
 * Returns array of values that matches the predicate. Considers nested objects.
 */
export const getValues = (value: any, predicate: (str: string) => boolean): string[] => {
  if (_.isNil(value)) {
    return [];
  }

  if (typeof value === 'string') {
    if (predicate(value)) {
      return [value];
    }
  }

  if (typeof value === 'object') {
    let arr: string[] = [];
    Object.keys(value).forEach(key => {
      arr = _.concat(arr, getValues(value[key], predicate));
    });
    return arr;
  }

  return [];
};

/**
 * Removes null values from an object. Considers nested objects.
 */
export const removeNulls = (o: any): any => {
  if (typeof o !== 'object' && o !== null) {
    return o;
  }
  const result = {};

  Object.keys(o).forEach(k => {
    if (!o[k] || typeof o[k] !== 'object') {
      if (o[k]) {
        result[k] = o[k]; // If not null or not an object, copy value
      }
    } else {
      // The property is an object
      const val = removeNulls(o[k]);

      if (typeof val === 'object' && val != null && Object.keys(val).length > 0) {
        result[k] = val;
      }
    }
  });

  return result;
};
