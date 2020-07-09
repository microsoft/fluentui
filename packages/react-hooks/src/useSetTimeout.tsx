import { useConst } from './useConst';
import { useEffect } from 'react';

/**
 * Returns a wrapper function for `setTimeout` which automatically handles disposal.
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
    const id = useConst(
      () =>
        (setTimeout(() => {
          timeoutIds.splice(timeoutIds.indexOf(id), 1);
          func();
        }, duration) as unknown) as number,
    );

    timeoutIds.push(id);

    return id;
  };
};
