import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface MergedRefReturnType<T> extends React.RefObject<T> {}

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]): MergedRefReturnType<T> {
  const mergedCallback = (React.useCallback(
    (value: T) => {
      // Update the "current" prop hanging on the function.
      ((mergedCallback as unknown) as React.MutableRefObject<T>).current = value;

      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          ((ref as unknown) as React.MutableRefObject<T>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs],
  ) as unknown) as MergedRefReturnType<T>;

  return mergedCallback;
}
