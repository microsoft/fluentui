/**
 * Promise microtask debouncer used by Popper.js v2
 * This is no longer exported in Floating UI (Popper.js v3)
 * https://github.com/floating-ui/floating-ui/blob/v2.x/src/utils/debounce.js
 * @param fn function that will be debounced
 */
export const debounce = <T>(fn: () => T): (() => Promise<T>) => {
  let pending: Promise<T> | undefined;
  return () =>
    (pending ||= Promise.resolve().then(() => {
      pending = undefined;
      return fn();
    }));
};
