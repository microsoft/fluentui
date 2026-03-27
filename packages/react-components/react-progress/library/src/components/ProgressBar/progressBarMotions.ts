import { createMotionComponent, motionTokens } from '@fluentui/react-motion';

/**
 * Motion component for the indeterminate ProgressBar bar:
 * a horizontal sliding animation that loops indefinitely.
 * In reduced motion mode, the bar pulses opacity instead of sliding.
 */
export const ProgressBarIndeterminateMotion = createMotionComponent({
  // translate percentages are relative to the element's own width, not the container's.
  // The indeterminate bar is ~33% the width of its container, so:
  //   translate: '-100%' === left: '-33%' (one bar-width off-screen to the left)
  //   translate: '300%'  === left: '100%' (3 × bar-width ≈ full container width, off-screen to the right)
  keyframes: [{ translate: '-100%' }, { translate: '300%' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,

  reducedMotion: {
    keyframes: [{ opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }],
    duration: 3000,
    iterations: Infinity,
  },
});
