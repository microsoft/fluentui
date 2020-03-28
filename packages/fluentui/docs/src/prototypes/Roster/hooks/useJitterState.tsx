import * as React from 'react';

export const useJitterState = ({
  from = 1000,
  to = 3000,
  enabled = true,
}: {
  from?: number;
  to?: number;
  enabled?: boolean;
}) => {
  const [flag, setFlag] = React.useState(false);

  const timeoutHandle = React.useRef<any>();

  const jitter = () => {
    setFlag(prev => !prev);
    if (enabled) {
      timeoutHandle.current = setTimeout(jitter, from + Math.floor(Math.random() * (to - from)));
    }
  };

  React.useEffect(() => {
    if (!enabled) {
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);
        setFlag(false);
      }
      return () => clearTimeout(timeoutHandle.current);
    }
    timeoutHandle.current = setTimeout(jitter, 0);
    return () => clearTimeout(timeoutHandle.current);
  }, [enabled]);

  return flag;
};
