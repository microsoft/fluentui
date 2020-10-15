import * as React from 'react';

/**
 * Hook which asynchronously executes a callback once the component has been mounted.
 *
 * @param callback - Function to call before mount.
 */
export const useMount = (callback: () => void) => {
  const mountRef = React.useRef(callback);
  mountRef.current = callback;
  React.useEffect(() => {
    mountRef.current?.();
  }, []);
};
