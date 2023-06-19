import * as React from 'react';
import { useStyles } from './useTimerStyles.styles';

export type TimerProps = {
  running: boolean;
  timeout: number;
  onTimeout: () => void;
  as?: 'span';
};

export const Timer = React.forwardRef<HTMLDivElement, TimerProps>((props, ref) => {
  const styles = useStyles();
  const { running, timeout, onTimeout } = props;

  const style: React.CSSProperties = {
    animationDuration: `${timeout}ms`,
    animationPlayState: running ? 'running' : 'paused',
  };

  if (timeout < 0) {
    return null;
  }

  return (
    <span
      onAnimationEnd={onTimeout}
      data-timer-status={style.animationPlayState}
      ref={ref}
      style={style}
      className={styles.progress}
    />
  );
});

Timer.displayName = 'Timer';
