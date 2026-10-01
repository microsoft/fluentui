import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams, MotionTiming, PoseEndpoints } from '../types';

/** An opacity value used as a fade pose. */
export type FadePose = number;

/**
 * Opacity poses for a fade motion. `from` is the starting opacity and `to` is the ending opacity; each describes the
 * opacity value at that point in the motion. If one is omitted, that endpoint defaults to `1` (fully opaque).
 *
 * At least one endpoint must be authored. The union permits `from`, `to`, or both, while rejecting an options object
 * with neither endpoint:
 *
 * @example
 * ```ts
 * const fadeFrom: FadeOptions = { from: 0.2, duration: 200 }; // to defaults to 1
 * const fadeTo: FadeOptions = { to: 0.2, duration: 200 }; // from defaults to 1
 * const fadeBetween: FadeOptions = { from: 0.2, to: 0.7, duration: 200 };
 * // @ts-expect-error At least one opacity endpoint is required.
 * const noEndpoints: FadeOptions = { duration: 200 };
 * ```
 */
export type FadeOptions = MotionTiming & PoseEndpoints<FadePose>;

/** Creates an absolute opacity motion between authored poses. */
export const fade = ({
  from = 1,
  to = 1,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: FadeOptions): AtomMotion => ({
  keyframes: [{ opacity: from }, { opacity: to }],
  duration,
  easing,
  delay,
  fill: 'both',
});

fade({ from: 0.2, duration: 300 });

/** Creates an absolute opacity motion from 0 to 1. */
export const fadeIn = (timing: MotionTiming): AtomMotion => fade({ ...timing, from: 0, to: 1 });

/** Creates an absolute opacity motion from 1 to 0. */
export const fadeOut = (timing: MotionTiming): AtomMotion => fade({ ...timing, from: 1, to: 0 });

interface FadeAtomParams extends BaseAtomParams {
  /** Defines how values are applied before and after execution. Defaults to 'both'. */
  fill?: FillMode;

  /** Opacity for the out pose. Defaults to 0. */
  outOpacity?: FadePose;

  /** Opacity for the in pose. Defaults to 1. */
  inOpacity?: FadePose;
}

/**
 * Generates a motion atom object for a fade-in or fade-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param delay - The delay before the motion starts. Defaults to 0.
 * @param outOpacity - Opacity for the out pose. Defaults to 0.
 * @param inOpacity - Opacity for the in pose. Defaults to 1.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 * @deprecated Use `fade` with explicit `from` and `to` poses, or `fadeIn`/`fadeOut` for a 0-to-1 or 1-to-0 fade.
 */
export const fadeAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outOpacity = 0,
  inOpacity = 1,
}: FadeAtomParams): AtomMotion => {
  return fade({
    from: direction === 'enter' ? outOpacity : inOpacity,
    to: direction === 'enter' ? inOpacity : outOpacity,
    duration,
    easing,
    delay,
  });
};
