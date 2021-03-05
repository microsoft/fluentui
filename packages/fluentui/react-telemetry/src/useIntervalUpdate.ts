import * as React from 'react';

export function useIntervalUpdate(interval: number = 2000): number {
  const [tick, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      forceUpdate();
    }, interval);

    return () => clearInterval(intervalId);
  }, [forceUpdate, interval]);

  return tick;
}
