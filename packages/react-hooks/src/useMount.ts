import * as React from 'react';

export const useMount = (mountFunction: () => void) => {
  const mountRef = React.useRef(mountFunction);
  mountRef.current = mountFunction;
  React.useLayoutEffect(() => {
    mountRef.current?.();
  }, []);
};
