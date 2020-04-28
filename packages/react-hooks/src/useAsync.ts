import { Async } from '@uifabric/utilities';
import { useEffect } from 'react';
import { useConst } from './useConst';

/**
 * Hook to provide an Async instance that is automatically cleaned up on dismount.
 */
export function useAsync() {
  const asyncRef = useConst<Async>(() => new Async());

  // Function that returns a function in order to dispose the async instance on unmount
  useEffect(() => () => asyncRef.dispose(), []);

  return asyncRef;
}
