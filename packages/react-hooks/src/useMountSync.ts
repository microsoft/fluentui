import * as React from 'react';

/**
 * Hook that asynchronously fires a callback before mount.
 *
 * `WARNING` This should only be used if useMount causes problems as it will
 * trigger debug warnings in server-rendered scenarios.
 *
 * @param callback - Function to call before mount.
 */
export const useMountSync = (callback: () => void) => {
  const mountRef = React.useRef(callback);
  mountRef.current = callback;
  React.useLayoutEffect(() => {
    mountRef.current?.();
  }, []);
};
