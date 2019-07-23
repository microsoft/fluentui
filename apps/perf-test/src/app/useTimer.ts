import * as React from 'react';

export const useTimer = () => {
  const [isRunning, setRunning] = React.useState(false);
  const [tick, setTick] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isVisible, setVisible] = React.useState(false);

  const setIsRunning = (value: boolean) => {
    if (value === true) {
      if (isRunning === false) {
        setTick(performance.now());
        setDuration(0);
        setRunning(true);
        setVisible(true);
      }
    } else {
      if (isRunning === true) {
        setRunning(false);
        setDuration(performance.now() - tick);
      }
    }
  };

  React.useEffect(() => {
    if (isRunning) {
      setIsRunning(false);
      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
  }, [isRunning]);

  return {
    duration,
    isVisible,
    setIsRunning
  };
};
