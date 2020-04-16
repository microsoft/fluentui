import { Async } from '@uifabric/utilities';
import { useRef, useEffect } from 'react';

export function useAsync() {
  const asyncRef = useRef<Async>();

  if (!asyncRef.current) {
    asyncRef.current = new Async();
  }

  // Function that returns a function in order to dispose the async instance on unmount
  useEffect(() => () => asyncRef.current?.dispose(), []);

  return asyncRef.current;
}
