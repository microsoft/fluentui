import * as React from 'react';

export const useDelayedState = ({ delayMs = 0 }: { delayMs?: number }) => {
  const [shouldRender, setShouldRender] = React.useState(delayMs === 0);

  React.useEffect(() => {
    const timeOut = setTimeout(() => setShouldRender(true), delayMs);

    return () => clearTimeout(timeOut);
  }, []);

  return shouldRender;
};
