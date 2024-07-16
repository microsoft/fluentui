import * as React from 'react';
import { useTimeout } from './useTimeout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (fn: (...args: any[]) => void, duration: number) => {
  const [setTimeout, clearTimeout] = useTimeout();
  return React.useCallback(
    (...args: unknown[]) => {
      clearTimeout();
      setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [clearTimeout, duration, fn, setTimeout],
  );
};
