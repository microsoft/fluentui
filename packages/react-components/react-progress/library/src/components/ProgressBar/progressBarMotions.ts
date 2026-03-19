'use client';

import { createMotionComponent, motionTokens } from '@fluentui/react-motion';

/**
 * Motion component for the indeterminate ProgressBar bar sliding animation.
 * In reduced motion mode, the bar pulses opacity instead of sliding.
 */
export const ProgressBarIndeterminate = createMotionComponent({
  keyframes: [{ left: '-33%' }, { left: '100%' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,
  reducedMotion: {
    keyframes: [{ opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }],
    duration: 3000,
    iterations: Infinity,
  },
});
