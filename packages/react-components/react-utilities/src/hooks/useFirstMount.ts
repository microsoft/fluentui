import * as React from 'react';

/**
 * Checks if components was mounted the first time.
 * Since concurrent mode will be released in the future this needs to be verified
 * Currently (React 17) will always render the initial mount once
 * https://codesandbox.io/s/heuristic-brook-s4w0q?file=/src/App.jsx
 * https://codesandbox.io/s/holy-grass-8nieu?file=/src/App.jsx
 *
 * @example
 * const isFirstMount = useFirstMount();
 */
export function useFirstMount(): boolean {
  const isFirst = React.useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return isFirst.current;
}
