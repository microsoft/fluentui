import * as _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (o: any) => o !== null && typeof o === 'object' && !Array.isArray(o);

/**
 * Merge function with specific type
 * @param objs - objects to be merged
 */
export function merge<T = Object>(...objs: Object[]): T {
  const merged = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customMerge = (dest: any, src: any): any => {
    if (_.isArray(dest)) {
      return _.uniq(dest.concat(src));
    } else if (isObject(dest) && isObject(src)) {
      return _.mergeWith({}, dest, src, customMerge);
    }
    return dest;
  };

  _.mergeWith(merged, ...objs, customMerge);

  return merged as T;
}
