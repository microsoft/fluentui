import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { MotionTiming } from '../types';

/** A CSS length used as a blur-radius pose. */
export type BlurPose = string;

/**
 * Explicit blur-radius endpoints (CSS lengths including units). Both `from` and `to` are required;
 * use `blurIn` or `blurOut` when arriving at or departing from `'0px'`.
 */
export type BlurOptions = MotionTiming & {
  from: BlurPose;
  to: BlurPose;
};

/** Options for blurring from an authored radius to `'0px'`. */
export type BlurInOptions = MotionTiming & { from: BlurPose; to?: never };

/** Options for blurring from `'0px'` to an authored radius. */
export type BlurOutOptions = MotionTiming & { from?: never; to: BlurPose };

/**
 * Creates an absolute blur motion between explicit `from` and `to` radii, without adding opacity or fill.
 * Radii are CSS lengths including units.
 *
 * @example
 * ```ts
 * blur({ from: '10px', to: '2px', duration: 300 });
 * blurIn({ from: '1rem', duration: 300 }); // 1rem to 0px
 * blurOut({ to: '10px', duration: 300 }); // 0px to 10px
 * ```
 */
export const blur = ({
  from,
  to,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: BlurOptions): AtomMotion => ({
  keyframes: [{ filter: `blur(${from})` }, { filter: `blur(${to})` }],
  duration,
  easing,
  delay,
});

/** Creates an absolute blur motion from an authored radius to `'0px'`. */
export const blurIn = ({ from, duration, easing, delay }: BlurInOptions): AtomMotion =>
  blur({ from, to: '0px', duration, easing, delay });

/** Creates an absolute blur motion from `'0px'` to an authored radius. */
export const blurOut = ({ to, duration, easing, delay }: BlurOutOptions): AtomMotion =>
  blur({ from: '0px', to, duration, easing, delay });
