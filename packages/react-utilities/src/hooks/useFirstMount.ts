import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * @example
 * const isFirstMount = useFirstMount();
 */
export function useFirstMount(): () => boolean {
  const isFirst = React.useRef(true);

  useIsomorphicLayoutEffect(() => {
    isFirst.current = false;
  }, []);

  return () => isFirst.current;
}
