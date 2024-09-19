import * as React from 'react';

export const useDebounce = (fn: (...args: unknown[]) => void, duration: number) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(0);

  return React.useCallback(
    (...args: unknown[]) => {
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      clearTimeout(timeoutRef.current);
      // eslint-disable-next-line @nx/workspace-no-restricted-globals
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, duration);
    },
    [duration, fn],
  );
};
