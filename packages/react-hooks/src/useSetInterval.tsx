import * as React from 'react';
import { useConst } from './useConst';
import { useEffect } from 'react';

export type UseSetIntervalReturnType = {
  setInterval: (callback: () => void, duration: number) => number;
  clearInterval: (id: number) => void;
};

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export const useSetInterval = (): UseSetIntervalReturnType => {
  const intervalIds = useConst<Record<number, number>>({});

  useEffect(
    () => () => {
      for (const id of Object.keys(intervalIds)) {
        // tslint:disable-next-line:no-any
        clearInterval(id as any);
      }
    },
    [],
  );

  return {
    setInterval: React.useCallback((func: () => void, duration: number): number => {
      const id = (setInterval(func, duration) as unknown) as number;

      intervalIds[id] = 1;

      return id;
    }, []),

    clearInterval: React.useCallback((id: number): void => {
      delete intervalIds[id];
      clearInterval(id);
    }, []),
  };
};
