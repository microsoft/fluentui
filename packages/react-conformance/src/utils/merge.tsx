import * as _ from 'lodash';

// tslint:disable-next-line:no-any
const isObject = (o: any) => o !== null && typeof o === 'object' && !_.isArray(o);

// tslint:disable-next-line:no-any
const _merge = (obj1: any, obj2: any, mergeArrayPrimitive: boolean) => {
  const keys: string[] = Object.getOwnPropertyNames(obj2);
  keys.forEach(k => {
    if (!_.has(obj1, k)) {
      _.set(obj1, k, obj2[k]);
    } else if (isObject(obj2[k])) {
      _merge(obj1[k], obj2[k], mergeArrayPrimitive);
    } else if (_.isArray(obj2[k])) {
      if (mergeArrayPrimitive) {
        obj1[k] = obj2[k].concat(obj1[k]);
      } else if (mergeArrayPrimitive && _.isArray(obj1[k])) {
        obj1[k] = obj2[k].concat(obj1[k]);
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
