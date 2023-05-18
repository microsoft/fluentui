import * as React from 'react';
import { useStyles } from './useTimerStyles.styles';

export const Timer: React.FC<{
  running: boolean;
  timeout: number;
  onTimeout: () => void;
}> = props => {
  const styles = useStyles();
  const { running, timeout, onTimeout } = props;
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const timerElement = ref.current;
      timerElement.addEventListener('animationend', onTimeout);
      return () => timerElement.removeEventListener('animationend', onTimeout);
    }
  }, [onTimeout]);

  const style: React.CSSProperties = {
    animationDuration: `${timeout}ms`,
    animationPlayState: running ? 'running' : 'paused',
  };

  if (timeout < 0) {
    return null;
  }

  return <span ref={ref} style={style} className={styles.progress} />;
};
