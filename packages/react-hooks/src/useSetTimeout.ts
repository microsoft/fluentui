import * as React from 'react';
import { useConst } from './useConst';

export type UseSetTimeoutReturnType = {
  setTimeout: (callback: () => void, duration: number) => number;
  clearTimeout: (id: number) => void;
};

/**
 *  Returns a wrapper function for `setTimeout` which automatically handles disposal.
 */
export const useSetTimeout = (): UseSetTimeoutReturnType => {
  const timeoutIds = useConst<Record<number, number>>({});

  // Cleanup function.
  React.useEffect(
    () => () => {
      for (const id of Object.keys(timeoutIds)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clearTimeout(id as any);
      }
    },
    // useConst ensures this will never change, but react-hooks/exhaustive-deps doesn't know that
    [timeoutIds],
  );

  // Return wrapper which will auto cleanup.
  return useConst({
    setTimeout: (func: () => void, duration: number): number => {
      const id = setTimeout(func, duration) as unknown as number;

      timeoutIds[id] = 1;

      return id;
    },

    clearTimeout: (id: number): void => {
      delete timeoutIds[id];
      clearTimeout(id);
    },
  });
};
