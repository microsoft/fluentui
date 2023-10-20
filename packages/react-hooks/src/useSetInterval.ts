import * as React from 'react';
import { useConst } from './useConst';

export type UseSetIntervalReturnType = {
  setInterval: (callback: () => void, duration: number) => number;
  clearInterval: (id: number) => void;
};

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export const useSetInterval = (): UseSetIntervalReturnType => {
  const intervalIds = useConst<Record<number, number>>({});

  React.useEffect(
    () => () => {
      for (const id of Object.keys(intervalIds)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clearInterval(id as any);
      }
    },
    // useConst ensures this will never change, but react-hooks/exhaustive-deps doesn't know that
    [intervalIds],
  );

  return useConst({
    setInterval: (func: () => void, duration: number): number => {
      const id = setInterval(func, duration) as unknown as number;

      intervalIds[id] = 1;

      return id;
    },

    clearInterval: (id: number): void => {
      delete intervalIds[id];
      clearInterval(id);
    },
  });
};
