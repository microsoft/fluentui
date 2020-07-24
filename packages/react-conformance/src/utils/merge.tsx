// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (o: any) => o !== null && typeof o === 'object' && !Array.isArray(o);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _merge = (obj1: any, obj2: any) => {
  const keys: string[] = Object.getOwnPropertyNames(obj2);
  keys.forEach(k => {
    if (obj1 && !obj1.hasOwnProperty(k)) {
      obj1[k] = obj2[k];
    } else if (isObject(obj2[k])) {
      _merge(obj1[k], obj2[k]);
    } else if (Array.isArray(obj2[k])) {
      obj1[k] = Array.isArray(obj1[k]) ? obj1[k].concat(obj2[k]) : obj1[k];
    }
  });
};

/**
 * Merge function with specific type
 * @param objs - objects to be merged
 */
export function merge<T = Object>(...objs: Object[]): T {
  const merged = { ...objs[0] };
  objs = objs.slice(1);

  objs.forEach(option => {
    _merge(merged, option);
  });

  return merged as T;
}
