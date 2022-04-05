import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * Creates a MutableRef with ref change callback. Is useful as React.useRef() doesn't notify you when its content
 * changes and mutating the .current property doesn't cause a re-render. An opt-out will be use a callback ref via
 * React.useState(), but it will cause re-renders always.
 *
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 * @param {Boolean} skipInitialResolve - a flag to skip an initial ref report
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
export function useCallbackRef<T>(
  initialValue: T | null,
  callback: (newValue: T | null, lastValue: T | null) => void,
  skipInitialResolve?: boolean,
): React.MutableRefObject<T | null> {
  const isFirst = React.useRef(true);
  const [ref] = React.useState(() => ({
    // value
    value: initialValue,
    // last callback
    callback,
    // "memoized" public interface
    facade: {
      get current() {
        return ref.value;
      },
      set current(value) {
        const last = ref.value;

        if (last !== value) {
          ref.value = value;

          if (skipInitialResolve && isFirst.current) {
            return;
          }

          ref.callback(value, last);
        }
      },
    },
  }));

  useIsomorphicLayoutEffect(() => {
    isFirst.current = false;
  }, []);

  // update callback
  ref.callback = callback;

  return ref.facade;
}
