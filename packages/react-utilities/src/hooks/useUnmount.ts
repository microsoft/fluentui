import * as React from 'react';

/**
 * Hook which synchronously executes a callback when the component is about to unmount.
 *
 * @param callback - Function to call during unmount.
 */
export const useUnmount = (callback: () => void) => {
  const unmountRef = React.useRef(callback);
  unmountRef.current = callback;
  React.useEffect(
    () => () => {
      unmountRef.current?.();
    },
    [],
  );
};
