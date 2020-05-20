import * as React from 'react';

/**
 * Hook to force update a function component by updating a dummy state.
 */
export function useForceUpdate(): () => void {
  const [, setValue] = React.useState(0);
  return () => setValue(value => ++value);
}
