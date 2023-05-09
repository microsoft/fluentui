import * as React from 'react';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  progress: {
    animationName: {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 0,
      },
    },
  },
});

export const Timer: React.FC<{
  running: boolean;
  timeout: number;
  onTimeout: () => void;
}> = props => {
  const styles = useStyles();
  const { running, timeout, onTimeout } = props;
  const cleanupRef = React.useRef<() => void>(() => null);

  const bindEventListeners = React.useCallback(
    (el: HTMLElement) => {
      cleanupRef.current();
      if (el) {
        el.addEventListener('animationend', onTimeout);
        cleanupRef.current = () => el.removeEventListener('animationend', onTimeout);
      }
    },
    [onTimeout],
  );

  const style: React.CSSProperties = {
    animationDuration: `${timeout}ms`,
    animationPlayState: running ? 'running' : 'paused',
  };

  if (timeout < 0) {
    return null;
  }

  return <span ref={bindEventListeners} style={style} className={styles.progress} />;
};
