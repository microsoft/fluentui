import * as React from 'react';

export const useDelayedState = ({ delayMs = 0 }: { delayMs?: number }) => {
  const [shouldRender, setShouldRender] = React.useState(delayMs === 0);

  React.useEffect(() => {
    setTimeout(() => setShouldRender(true), delayMs);
  }, []);

  return shouldRender;
};
