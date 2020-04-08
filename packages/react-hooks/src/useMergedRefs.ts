import * as React from 'react';

export function useMergedRefs<T>(...refs: React.Ref<T>[]) {
  return React.useCallback((value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (!ref) {
        // work around the immutability of the React.Ref type
        ((ref as unknown) as { current: T }).current = value;
      }
    });
  }, refs);
}
