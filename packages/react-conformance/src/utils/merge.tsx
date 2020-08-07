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
  const customMergeFunction = (dest: any, src: any): any => {
    if (_.isArray(dest)) {
      return _.uniq(dest.concat(src));
    } else if (isObject(dest) && isObject(src)) {
      const temp = {};
      _.mergeWith(temp, dest, src, customMergeFunction);
      return temp;
    }
    return dest;
  };

  _.mergeWith(merged, ...objs, customMergeFunction);

  return merged as T;
}
