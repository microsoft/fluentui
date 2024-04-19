import { makeStyles } from '@griffel/react';

export const useReducedMotionStyles = makeStyles({
  reduced: {
    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms !important',
    },
  },
});
