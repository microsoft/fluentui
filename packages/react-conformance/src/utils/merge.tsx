import * as _ from 'lodash';

// eslint-disable @typescript-eslint/no-explicit-any
const isObject = (o: any) => o !== null && typeof o === 'object' && !Array.isArray(o);

// eslint-disable @typescript-eslint/no-explicit-any
const _merge = (obj1: any, obj2: any, mergeArrayPrimitive: boolean) => {
  const keys: string[] = Object.getOwnPropertyNames(obj2);
  keys.forEach(k => {
    if (obj1 && !obj1.hasOwnProperty(k)) {
      obj1[k] = obj2[k];
    } else if (isObject(obj2[k])) {
      _merge(obj1[k], obj2[k], mergeArrayPrimitive);
    } else if (Array.isArray(obj2[k])) {
      if (mergeArrayPrimitive) {
        obj1[k] = (Array.isArray(obj1[k]) ? obj1[k] : [obj1[k]]).concat(obj2[k]);
      } else if (Array.isArray(obj1[k])) {
        obj1[k] = obj1[k].concat(obj2[k]);
      }
    }
  });
};

/**
 * Merge function with specific type
 * @param mergeArrayPrimitive Merge array with primitive value, i.e.:
 *  a { ob: ['foo', 'bar'] }
 *  b { ob: 'a' }
 *  merge(true, a, b) === { ob: ['foo', 'bar', 'a'] }
 * @param objs
 */
export function merge<T = Object>(mergeArrayPrimitive: boolean, ...objs: Object[]): T {
  const merged = Object.assign({}, objs[0]);
  objs = objs.slice(1);

  objs.forEach(option => {
    _merge(merged, option, mergeArrayPrimitive);
  });

  return merged as T;
}
