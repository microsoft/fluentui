import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams, MotionTiming, PoseEndpoints } from '../types';

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

/** Translation poses; omitted poses and axes default to zero. */
export type SlideOptions = MotionTiming & PoseEndpoints<SlidePose>;

/** Options for entering from an authored pose to the zero-translation pose. */
export type SlideInOptions = MotionTiming & { from: SlidePose; to?: never };

/** Options for exiting from the zero-translation pose to an authored pose. */
export type SlideOutOptions = MotionTiming & { from?: never; to: SlidePose };

/** Creates an absolute translation motion between authored CSS poses. */
export const slide = ({
  from,
  to,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: SlideOptions): AtomMotion => ({
  keyframes: [
    { translate: `${from?.x ?? '0px'} ${from?.y ?? '0px'}` },
    { translate: `${to?.x ?? '0px'} ${to?.y ?? '0px'}` },
  ],
  duration,
  easing,
  delay,
});

/** Creates an absolute translation motion from an authored pose to zero. */
export const slideIn = ({ from, duration, easing, delay }: SlideInOptions): AtomMotion =>
  slide({ from, duration, easing, delay });

/** Creates an absolute translation motion from zero to an authored pose. */
export const slideOut = ({ to, duration, easing, delay }: SlideOutOptions): AtomMotion =>
  slide({ to, duration, easing, delay });

interface SlideAtomParams extends BaseAtomParams {
  /** X translate for the out pose. Defaults to '0px'. */
  outX?: string;
  /** Y translate for the out pose. Defaults to '0px'. */
  outY?: string;
  /** X translate for the in pose. Defaults to '0px'. */
  inX?: string;
  /** Y translate for the in pose. Defaults to '0px'. */
  inY?: string;
}

/**
 * Generates a motion atom object for a slide-in or slide-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param outX - X translate for the out pose with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param outY - Y translate for the out pose with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param inX - X translate for the in pose with units (e.g., '5px', '10%'). Defaults to '0px'.
 * @param inY - Y translate for the in pose with units (e.g., '5px', '10%'). Defaults to '0px'.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outX = '0px',
  outY = '0px',
  inX = '0px',
  inY = '0px',
}: SlideAtomParams): AtomMotion => {
  return slide({
    from: direction === 'enter' ? { x: outX, y: outY } : { x: inX, y: inY },
    to: direction === 'enter' ? { x: inX, y: inY } : { x: outX, y: outY },
    duration,
    easing,
    delay,
  });
};
