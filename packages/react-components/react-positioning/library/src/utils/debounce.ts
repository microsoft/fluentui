/**
 * Promise microtask debouncer used by Popper.js v2
 * This is no longer exported in Floating UI (Popper.js v3)
 * https://github.com/floating-ui/floating-ui/blob/v2.x/src/utils/debounce.js
 * @param fn function that will be debounced
 */
export function debounce<T>(fn: Function): () => Promise<T> {
  let pending: Promise<T> | undefined;
  return () => {
    if (!pending) {
      pending = new Promise<T>(resolve => {
        Promise.resolve().then(() => {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}
