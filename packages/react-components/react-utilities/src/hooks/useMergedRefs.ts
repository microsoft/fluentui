import * as React from 'react';

/**
 * A Ref function which can be treated like a ref object in that it has an attached
 * current property, which will be updated as the ref is evaluated.
 */
export type RefObjectFunction<T> = React.RefObject<T> & ((value: T | null) => void);

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs - Refs to collectively update with one ref value.
 * @returns A function with an attached "current" prop, so that it can be treated like a RefObject.
 */
export function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]): RefObjectFunction<T> {
  'use no memo';

  const mergedCallback: RefObjectFunction<T> = React.useCallback(
    (value: T | null) => {
      // Update the "current" prop hanging on the function.
      (mergedCallback as React.MutableRefObject<T | null>).current = value;

      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs],
  ) as RefObjectFunction<T>;

  return mergedCallback;
}
