import * as React from 'react';

/**
 * Hook that synchronously fires a callback during unmount.
 *
 * @param callback - Function to call during unmount.
 */
export const useUnmount = (callback: () => void) => {
  const unmountRef = React.useRef(callback);
  unmountRef.current = callback;
  React.useLayoutEffect(
    () => () => {
      unmountRef.current?.();
    },
    [],
  );
};
