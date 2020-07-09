import { useConst } from './useConst';
import { useEffect } from 'react';

/**
 *  Returns a wrapper function for `setInterval` which automatically handles disposal.
 */
export const useSetInterval = () => {
  const intervalIds = useConst<number[]>([]);

  useEffect(
    () => () => {
      for (const id of intervalIds) {
        clearInterval(id);
      }
      intervalIds.splice(0);
    },
    [],
  );

  return (func: () => void, duration: number) => {
    const id = (setInterval(() => {
      intervalIds.splice(intervalIds.indexOf(id), 1);
      func();
    }, duration) as unknown) as number;

    intervalIds.push(id);

    return id;
  };
};
