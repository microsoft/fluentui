import * as React from 'react';

/**
 * Creates a ref, and calls a callback whenever the ref changes to a non-null value.
 * The callback can optionally return a cleanup function that'll be called before the value changes or is set to null.
 *
 * This can be used to work around a limitation that useEffect cannot depend on `ref.current` (see
 * https://github.com/facebook/react/issues/14387#issuecomment-503616820).
 *
 * @param callback - Called whenever the ref's value changes to non-null. Can optionally return a cleanup function.
 * @param initialValue - (Optional) The initial value for the ref.
 *
 * @returns A tuple of`[ref, setRef]`:
 * * `ref` - Read-only view of the ref's current value
 * * `setRef` - A ref setter function that can be used to change the ref's current value.
 */
export function useRefEffect<T>(
  callback: (current: T) => (() => void) | void,
  initialValue?: T | null,
): [/*ref:*/ React.RefObject<T>, /*setRef:*/ (ele: T | null) => void] {
  type RefData = {
    ref: React.MutableRefObject<T | null>;
    setRef: (ele: T | null) => void;
    cleanup?: (() => void) | void;
  };

  const data = React.useRef<RefData>({
    ref: { current: initialValue !== undefined ? initialValue : null },
    setRef: ele => {
      if (data.ref.current !== ele) {
        if (data.cleanup) {
          data.cleanup();
          data.cleanup = undefined;
        }
        data.ref.current = ele;
        data.cleanup = ele !== null ? callback(ele) : undefined;
      }
    },
  }).current;

  return [data.ref, data.setRef];
}
