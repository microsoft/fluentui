import { useRef, useCallback, Ref, MutableRefObject } from 'react';

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export function useMergedRefs<T>(...refs: Ref<T>[]): (instance: T) => void {
  const state = useRef<(Ref<T> | undefined)[]>();

  // Update refs list in immutatable state object.
  state.current = refs;

  // Return cached callback which refers to mutable refs array within the immutable state.
  return useCallback((value: T) => {
    for (const ref of state.current!) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        // work around the immutability of the React.Ref type
        ((ref as unknown) as MutableRefObject<T>).current = value;
      }
    }
  }, []);
}
