import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { MotionTiming } from '../types';

/**
 * The CSS translation values at one point in a slide motion, such as its `from` or `to` value.
 *
 * At least one axis must be provided so the pose describes an authored translation. The other axis is optional
 * and defaults to `0px` when the motion is created. The union allows either axis on its own, or both axes:
 *
 * @example
 * ```ts
 * const horizontal: SlidePose = { x: '24px' }; // y defaults to 0px
 * const vertical: SlidePose = { y: '-12px' }; // x defaults to 0px
 * const diagonal: SlidePose = { x: '24px', y: '-12px' };
 * // @ts-expect-error At least one translation axis is required.
 * const empty: SlidePose = {};
 * ```
 */
export type SlidePose = { x: string; y?: string } | { x?: string; y: string };

/**
 * Explicit translation endpoints for a slide motion. Both `from` and `to` are required (omitted axes within each pose
 * default to `'0px'`); use `slideIn` or `slideOut` when arriving at or departing from zero translation.
 */
export type SlideOptions = MotionTiming & {
  from: SlidePose;
  to: SlidePose;
};

/** Options for entering from an authored pose to the zero-translation pose. */
export type SlideInOptions = MotionTiming & { from: SlidePose; to?: never };

/** Options for exiting from the zero-translation pose to an authored pose. */
export type SlideOutOptions = MotionTiming & { from?: never; to: SlidePose };

const ZERO_SLIDE_POSE: SlidePose = { x: '0px', y: '0px' };

/** Creates an absolute translation motion between explicit `from` and `to` CSS poses. */
export const slide = ({
  from,
  to,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: SlideOptions): AtomMotion => ({
  // SlidePose requires at least one axis (x and/or y), so the omitted axis within each pose defaults to '0px'.
  keyframes: [
    { translate: `${from.x ?? '0px'} ${from.y ?? '0px'}` },
    { translate: `${to.x ?? '0px'} ${to.y ?? '0px'}` },
  ],
  duration,
  easing,
  delay,
});

/** Creates an absolute translation motion from an authored pose to zero. */
export const slideIn = ({ from, duration, easing, delay }: SlideInOptions): AtomMotion =>
  slide({ from, to: ZERO_SLIDE_POSE, duration, easing, delay });

/** Creates an absolute translation motion from zero to an authored pose. */
export const slideOut = ({ to, duration, easing, delay }: SlideOutOptions): AtomMotion =>
  slide({ from: ZERO_SLIDE_POSE, to, duration, easing, delay });
