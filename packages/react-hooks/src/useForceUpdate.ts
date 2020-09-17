import * as React from 'react';
import { useConst } from './useConst';

/**
 * Hook to force update a function component by updating a dummy state.
 */
export function useForceUpdate(): () => void {
  const [, setValue] = React.useState(0);
  const forceUpdate = useConst(() => () => setValue(value => ++value));
  return forceUpdate;
}
