/**
 * Microtask debouncer
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
 * @param fn - Function to debounce
 * @returns debounced function
 */
export function debounce(fn: Function) {
  let pending: boolean;

  // React testing platforms will often output errors when state updates happen outside `act`
  // Since there is nothing obvious to wait for we just avoid debouncing in unit test environments
  if (process.env.NODE_ENV === 'test') {
    return fn as () => void;
  }

  return () => {
    if (!pending) {
      pending = true;
      queueMicrotask(() => {
        // Need to set pending to `false` before the debounced function is run.
        // React can actually interrupt the function while it's running!
        pending = false;
        fn();
      });
    }
  };
}
