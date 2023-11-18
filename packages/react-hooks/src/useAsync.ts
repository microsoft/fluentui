import { Async } from '@fluentui/utilities';
import * as React from 'react';

/**
 * Hook to provide an Async instance that is automatically cleaned up on dismount.
 */
export function useAsync() {
  const asyncRef = React.useRef<Async>();
  if (!asyncRef.current) {
    asyncRef.current = new Async();
  }
  React.useEffect(() => {
    return () => {
      asyncRef.current?.dispose();
      asyncRef.current = undefined;
    };
  }, []);
  return asyncRef.current;
}
