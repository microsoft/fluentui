import { useCallback, Ref, MutableRefObject } from 'react';

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refA- A first ref to collectively update with one ref value.
 * @param refB- A second ref to collectively update with one ref value.
 */
export function useMergedRefs<T>(refA: Ref<T>, refB: Ref<T>): (instance: T) => void {
  return useCallback(
    (value: T) => {
      for (const ref of [refA, refB]) {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          ((ref as unknown) as MutableRefObject<T>).current = value;
        }
      }
    },
    [refA, refB],
  );
}
