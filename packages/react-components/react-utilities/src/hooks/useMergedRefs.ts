import * as React from 'react';

/**
 * A Ref function which can be treated like a ref object in that it has an attached
 * current property, which will be updated as the ref is evaluated.
 */
export type RefObjectFunction<T> = React.RefObject<T> & ((value: T) => void);

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs - Refs to collectively update with one ref value.
 * @returns A function with an attached "current" prop, so that it can be treated like a RefObject.
 */
export function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]): RefObjectFunction<T> {
  const mergedCallback: RefObjectFunction<T> = React.useCallback(
    (value: T) => {
      // Update the "current" prop hanging on the function.
      (mergedCallback as unknown as React.MutableRefObject<T>).current = value;

      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          (ref as unknown as React.MutableRefObject<T>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs],
  ) as unknown as RefObjectFunction<T>;

  return mergedCallback;
}
