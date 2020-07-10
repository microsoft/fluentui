import * as React from 'react';
import { useConst } from './useConst';
import { useEffect } from 'react';

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
  useEffect(
    () => () => {
      for (const id of Object.keys(timeoutIds)) {
        clearTimeout(id as any);
      }
    },
    [],
  );

  // Return wrapper which will auto cleanup.
  return {
    setTimeout: React.useCallback((func: () => void, duration: number): number => {
      const id = (setTimeout(func, duration) as unknown) as number;

      timeoutIds[id] = 1;

      return id;
    }, []),

    clearTimeout: React.useCallback((id: number): void => {
      delete timeoutIds[id];
      clearTimeout(id);
    }, []),
  };
};
