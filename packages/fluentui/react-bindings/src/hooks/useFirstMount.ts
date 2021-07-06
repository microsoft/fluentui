import * as React from 'react';

/**
 * Checks if components was mounted the first time.
 * @example
 * const isFirstMount = useFirstMount();
 *
 * @returns {Boolean}
 */
export function useFirstMount(): boolean {
  const isFirst = React.useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}
