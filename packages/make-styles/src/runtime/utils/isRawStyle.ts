// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRawStyle(val: any): boolean {
  // eslint-disable-next-line eqeqeq
  return val != null && (typeof val === 'object' || Array.isArray(val));
}
