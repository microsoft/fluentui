import { useConst } from './useConst';
import { useEffect } from 'react';

/**
 * Returns a self disposing setTimeout function.
 */
export const useSetTimeout = () => {
  const timeoutIds = useConst<number[]>([]);

  useEffect(
    () => () => {
      for (const id of timeoutIds) {
        clearTimeout(id);
      }
      timeoutIds.splice(0);
    },
    [],
  );

  return (func: () => void, duration: number) => {
    const id = (setTimeout(() => {
      timeoutIds.splice(timeoutIds.indexOf(id), 1);
      func();
    }, duration) as unknown) as number;

    timeoutIds.push(id);

    return id;
  };
};
