import { createMotionComponent, createMotionComponentVariant, motionTokens } from '@fluentui/react-motion';
import { Rotate } from '@fluentui/react-motion-components-preview';

// --- Tail arc animations ---
// The spinner tail uses a 105deg arc mask with two 135deg arc segments that rotate
// in and out from behind the mask to create a pulsing arc effect (30deg min → 255deg max).
// All three animations share the same timing: 1.5s, curveEasyEase, infinite.

const SPINNER_DURATION = 1500;
const TAIL_ARC_EASING = motionTokens.curveEasyEase;

/**
 * Motion component for the Spinner root 360° rotation animation.
 * In reduced motion mode, the duration is slightly longer (1.8s) per the original CSS fallback.
 * @internal
 */
export const SpinnerRotation = createMotionComponent<{ duration?: number; easing?: string }>(
  ({ duration = SPINNER_DURATION, easing = motionTokens.curveLinear }) => ({
    keyframes: [{ rotate: '0deg' }, { rotate: '360deg' }],
    duration,
    easing,
    iterations: Infinity,
    reducedMotion: {
      duration: 1800,
    },
  }),
);

export const SpinnerRotation2 = createMotionComponentVariant(Rotate.In, {
  duration: SPINNER_DURATION,
  easing: motionTokens.curveLinear,
  iterations: Infinity,
  reducedMotion: {
    duration: 1800,
  },
});

/**
 * Motion component for the spinnerTail container rotation.
 * Rotates from -135deg → 0deg → 225deg to sweep the masked arc window.
 * @internal
 */
export const SpinnerTailMotion = createMotionComponent<{ duration?: number; easing?: string }>(
  ({ duration = SPINNER_DURATION, easing = TAIL_ARC_EASING }) => ({
    keyframes: [{ rotate: '-135deg' }, { rotate: '0deg' }, { rotate: '225deg' }],
    duration,
    easing,
    iterations: Infinity,
    reducedMotion: {
      duration: 1,
      iterations: 1,
    },
  }),
);

/**
 * Motion component for the leading arc segment (was ::before).
 * Expands from 0deg → 105deg then collapses back to 0deg.
 * @internal
 */
export const SpinnerLeadArcMotion = createMotionComponent<{ duration?: number; easing?: string }>(
  ({ duration = SPINNER_DURATION, easing = TAIL_ARC_EASING }) => ({
    keyframes: [{ rotate: '0deg' }, { rotate: '105deg' }, { rotate: '0deg' }],
    duration,
    easing,
    iterations: Infinity,
    reducedMotion: {
      duration: 1,
      iterations: 1,
    },
  }),
);

/**
 * Motion component for the trailing arc segment (was ::after).
 * Expands from 0deg → 225deg then collapses back to 0deg.
 * @internal
 */
export const SpinnerTrailArcMotion = createMotionComponent<{ duration?: number; easing?: string }>(
  ({ duration = SPINNER_DURATION, easing = TAIL_ARC_EASING }) => ({
    keyframes: [{ rotate: '0deg' }, { rotate: '225deg' }, { rotate: '0deg' }],
    duration,
    easing,
    iterations: Infinity,
    reducedMotion: {
      duration: 1,
      iterations: 1,
    },
  }),
);
