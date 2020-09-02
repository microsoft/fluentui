import * as React from 'react';
import { useConstCallback } from './useConstCallback';

/**
 * Hook to force update a function component by updating a dummy state.
 */
export function useForceUpdate(): () => void {
  const [, setValue] = React.useState(0);
  const forceUpdate = useConstCallback(() => setValue(value => ++value));
  return forceUpdate;
}
