import * as React from 'react';

export const useDebounce = (fn: (...args: unknown[]) => void, duration: number) => {
  const timeoutRef = React.useRef(0);

  return React.useCallback(
    (...args: unknown[]) => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      window.clearTimeout(timeoutRef.current);
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [duration, fn],
  );
};
