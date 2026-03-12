'use client';

import { createMotionComponent, motionTokens } from '@fluentui/react-motion';

/**
 * Motion component for the Spinner root 360° rotation animation.
 * In reduced motion mode, the duration is slightly longer (1.8s) per the original CSS fallback.
 */
export const SpinnerRotation = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '360deg' }],
  duration: 1500,
  iterations: Infinity,
  easing: motionTokens.curveLinear,
  reducedMotion: {
    duration: 1800,
  },
});
