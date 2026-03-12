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

// --- Tail arc animations ---
// The spinner tail uses a 105deg arc mask with two 135deg arc segments that rotate
// in and out from behind the mask to create a pulsing arc effect (30deg min → 255deg max).
// All three animations share the same timing: 1.5s, curveEasyEase, infinite.

const TAIL_ARC_DURATION = 1500;
const TAIL_ARC_EASING = motionTokens.curveEasyEase;

/**
 * Motion component for the spinnerTail container rotation.
 * Rotates from -135deg → 0deg → 225deg to sweep the masked arc window.
 */
export const SpinnerTailMotion = createMotionComponent({
  keyframes: [{ rotate: '-135deg' }, { rotate: '0deg' }, { rotate: '225deg' }],
  duration: TAIL_ARC_DURATION,
  iterations: Infinity,
  easing: TAIL_ARC_EASING,
  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});

/**
 * Motion component for the first arc segment (was ::before).
 * Expands from 0deg → 105deg then collapses back to 0deg.
 */
export const SpinnerArcStartMotion = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '105deg' }, { rotate: '0deg' }],
  duration: TAIL_ARC_DURATION,
  iterations: Infinity,
  easing: TAIL_ARC_EASING,
  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});

/**
 * Motion component for the second arc segment (was ::after).
 * Expands from 0deg → 225deg then collapses back to 0deg.
 */
export const SpinnerArcEndMotion = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '225deg' }, { rotate: '0deg' }],
  duration: TAIL_ARC_DURATION,
  iterations: Infinity,
  easing: TAIL_ARC_EASING,
  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});
