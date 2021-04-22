import * as React from 'react';

/**
 * Hook which synchronously executes a callback once the component has been mounted.
 *
 * `WARNING` This should only be used if you need to perform an action after the component has been mounted and
 * before the browser paints. useMountSync will trigger debug warnings in server-rendered scenarios and should be used
 * sparingly.
 *
 * @deprecated Consider to use React.useEffect() or React.useLayoutEffect() directly based on a use case
 *
 * @param callback - Function to call once the component has been mounted.
 */
export const useMountSync = (callback: () => void) => {
  const mountRef = React.useRef(callback);
  mountRef.current = callback;
  // eslint-disable-next-line no-restricted-properties
  React.useLayoutEffect(() => {
    mountRef.current?.();
  }, []);
};
