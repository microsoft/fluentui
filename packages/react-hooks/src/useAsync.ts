import { Async } from '@uifabric/utilities';
import * as React from 'react';
import { useConst } from './useConst';

/**
 * Hook to provide an Async instance that is automatically cleaned up on dismount.
 */
export function useAsync() {
  const asyncRef = useConst<Async>(() => new Async());

  // Function that returns a function in order to dispose the async instance on unmount
  React.useEffect(() => () => asyncRef.dispose(), [asyncRef]);

  return asyncRef;
}
