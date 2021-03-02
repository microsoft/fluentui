// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(val: any): val is Object {
  // eslint-disable-next-line eqeqeq
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
