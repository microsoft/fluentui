import * as React from 'react';

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export function useMergedRefs<T>(...refs: React.Ref<T>[]): (instance: T) => void {
  return React.useCallback((value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        // work around the immutability of the React.Ref type
        ((ref as unknown) as React.MutableRefObject<T>).current = value;
      }
    });
  }, refs);
}
