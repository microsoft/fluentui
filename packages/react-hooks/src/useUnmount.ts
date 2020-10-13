import * as React from 'react';

export const useUnmount = (unmountFunction: () => void) => {
  const unmountRef = React.useRef(unmountFunction);
  unmountRef.current = unmountFunction;
  React.useLayoutEffect(
    () => () => {
      unmountRef.current?.();
    },
    [],
  );
};
