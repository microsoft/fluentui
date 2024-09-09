import { makeResetStyles } from '@griffel/react';

export const useBaseAnimationStyles = makeResetStyles({
  animationName: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 0,
    },
  },
});
