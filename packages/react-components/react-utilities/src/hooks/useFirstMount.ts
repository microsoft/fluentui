import * as React from 'react';

/**
 * @internal
 * Checks if components was mounted the first time.
 * Supports React concurrent/strict mode by using `useEffect`
 * to track the first mount instead of mutating refs during render.
 *
 * @example
 * const isFirstMount = useFirstMount();
 */
export function useFirstMount(): boolean {
  const isFirst = React.useRef(true);

  React.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    }
  }, []);

  return isFirst.current;
}
