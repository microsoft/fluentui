import * as React from 'react';

export const useDebounce = (fn: (...args: unknown[]) => void, duration: number) => {
  const timeoutRef = React.useRef(0);

  return React.useCallback(
    (...args: unknown[]) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [duration, fn],
  );
};
