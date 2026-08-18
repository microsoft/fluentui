/**
 * Microtask debouncer
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
 * @param fn - Function to debounce
 * @returns debounced function
 */
export function debounce(fn: () => void): Debounced {
  let pending: boolean;
  let version = 0;

  // React testing platforms will often output errors when state updates happen outside `act`
  // Since there is nothing obvious to wait for we just avoid debouncing in unit test environments
  if (process.env.NODE_ENV === 'test') {
    return Object.assign(() => fn(), { cancel: () => undefined });
  }

  const debounced = () => {
    if (!pending) {
      pending = true;
      const scheduledVersion = ++version;
      queueMicrotask(() => {
        if (scheduledVersion !== version) {
          return;
        }

        // Need to set pending to `false` before the debounced function is run.
        // React can actually interrupt the function while it's running!
        pending = false;
        fn();
      });
    }
  };

  debounced.cancel = () => {
    pending = false;
    version++;
  };

  return debounced;
}

export type Debounced = (() => void) & {
  cancel: () => void;
};
