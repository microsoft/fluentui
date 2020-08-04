import * as _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (o: any) => o !== null && typeof o === 'object' && !_.isArray(o);

/**
 * Merge function with specific type
 * @param objs - objects to be merged
 */
export function merge<T = Object>(...objs: Object[]): T {
  const [merged, ...rest] = objs;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customMergeFunction = (dest: any, src: any): any => {
    if (isObject(dest) && isObject(dest)) {
      return _.mergeWith(dest, src, customMergeFunction);
    } else if (Array.isArray(src) && Array.isArray(dest)) {
      return _.uniq(dest.concat(src));
    } else if (!Array.isArray(src) && !isObject(src) && Array.isArray(dest)) {
      return _.uniq(dest.concat(src));
    }
    return dest;
  };

  return (_.mergeWith(merged, ...rest, customMergeFunction) as unknown) as T;
}
