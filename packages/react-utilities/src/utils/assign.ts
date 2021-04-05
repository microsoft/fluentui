/**
 * Overload set for the assign(target, ...sources) function.
 * Returns the interserction of the supplied object(s).
 */
export type AssignFunction = {
  <T, S>(target: T, source: S): T & S;
  <T, S1, S2>(target: T, source1: S1, s2: S2): T & S1 & S2;
  <T, S1, S2, S3>(target: T, source1: S1, s2: S2, s3: S3): T & S1 & S2 & S3;
  <T, S1, S2, S3, S4>(target: T, source1: S1, s2: S2, s3: S3, s4: S4): T & S1 & S2 & S3 & S4;
  <T, S1, S2, S3, S4, S5>(target: T, source1: S1, s2: S2, s3: S3, s4: S4, s5: S5): T & S1 & S2 & S3 & S4 & S5;
};

/**
 * Implementation of the polyfill for Object.assign.
 * Use assign() instead, which will use the native implementation of Object.assign if available.
 *
 * Shallow-copy all properties from multiple sources onto target.
 */
export const assignImpl: AssignFunction = (target: Record<string, never>, ...sources: Record<string, never>[]) => {
  for (const source of sources) {
    for (const k in source) {
      if (Object.prototype.hasOwnProperty.call(source, k)) {
        target[k] = source[k];
      }
    }
  }

  return target;
};

/**
 * Polyfill for Object.assign.
 *
 * Shallow-copy all properties from multiple sources onto target.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const assign: AssignFunction = (Object as any).assign ?? assignImpl;
