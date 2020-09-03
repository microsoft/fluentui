import { useCallback, Ref, MutableRefObject } from 'react';

type MergedRefReturnType<T> = ((instance: T) => void) & { current: T };
/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export function useMergedRefs<T>(...refs: (Ref<T> | undefined)[]): MergedRefReturnType<T> {
  const mergedCallback = useCallback(
    (value: T) => {
      // Update the "current" prop hanging on the function.
      mergedCallback.current = value;

      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          ((ref as unknown) as MutableRefObject<T>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs],
  ) as MergedRefReturnType<T>;

  return mergedCallback;
}
