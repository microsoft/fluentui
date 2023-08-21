import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import { MotionState } from '@fluentui/react-motion-preview';

const useStyles = makeStyles({
  reducedMotion: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.001ms',
    },
  },
});

export function useMotionStyles(motion: MotionState, classNames: string): string {
  const styles = useStyles();

  return React.useMemo(() => {
    if (!motion.hasInternalMotion) {
      return '';
    }

    return mergeClasses(styles.reducedMotion, classNames);
  }, [classNames, motion.hasInternalMotion, styles.reducedMotion]);
}
