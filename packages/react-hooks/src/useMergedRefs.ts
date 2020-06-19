import { useState, useCallback, Ref, MutableRefObject } from 'react';

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export function useMergedRefs<T>(...refObjects: React.Ref<T>[]): (instance: T) => void {
  const [state] = useState<{ refs: (Ref<T> | undefined)[] }>({ refs: [] });

  // Cache refs in immutatable state object.
  state.refs = refObjects;

  // Return cached callback which refers to mutable refs array within the immutable state.
  return useCallback((value: T) => {
    const { refs } = state;

    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        // work around the immutability of the React.Ref type
        ((ref as unknown) as MutableRefObject<T>).current = value;
      }
    }
  }, []);
}
