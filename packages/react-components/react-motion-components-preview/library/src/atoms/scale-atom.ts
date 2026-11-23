import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams, MotionTiming, PoseEndpoints } from '../types';

/** A numeric scale value used as a scale pose. */
export type ScalePose = number;

/**
 * Scale poses for a motion. `from` is the starting scale and `to` is the ending scale; an omitted endpoint defaults
 * to `1` (the element's unscaled size).
 *
 * At least one endpoint must be authored. The union permits `from`, `to`, or both, while rejecting an options object
 * with neither endpoint:
 *
 * @example
 * ```ts
 * const scaleFrom: ScaleOptions = { from: 0.9, duration: 200 }; // to defaults to 1
 * const scaleTo: ScaleOptions = { to: 0.9, duration: 200 }; // from defaults to 1
 * const scaleBetween: ScaleOptions = { from: 0.8, to: 1.2, duration: 200 };
 * // @ts-expect-error At least one scale endpoint is required.
 * const noEndpoints: ScaleOptions = { duration: 200 };
 * ```
 */
export type ScaleOptions = MotionTiming & PoseEndpoints<ScalePose>;

/** Options for entering from an outer scale (default `0`) to the neutral scale of `1`. */
export type ScaleInOptions = MotionTiming & { from?: ScalePose; to?: never };

/** Options for exiting from the neutral scale of `1` to an outer scale (default `0`). */
export type ScaleOutOptions = MotionTiming & { from?: never; to?: ScalePose };

/** Creates an absolute scale motion between authored numeric poses. */
export const scale = ({
  from = 1,
  to = 1,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: ScaleOptions): AtomMotion => ({
  keyframes: [{ scale: from }, { scale: to }],
  duration,
  easing,
  delay,
});

/** Creates an absolute scale motion arriving at `1` from `from` (default `0`). */
export const scaleIn = ({ from = 0, duration, easing, delay }: ScaleInOptions): AtomMotion =>
  scale({ from, to: 1, duration, easing, delay });

/** Creates an absolute scale motion departing from `1` to `to` (default `0`). */
export const scaleOut = ({ to = 0, duration, easing, delay }: ScaleOutOptions): AtomMotion =>
  scale({ from: 1, to, duration, easing, delay });

interface ScaleAtomParams extends BaseAtomParams {
  /** Scale for the out pose. Defaults to 0.9. */
  outScale?: ScalePose;
  /** Scale for the in pose. Defaults to 1. */
  inScale?: ScalePose;
}

/**
 * Generates a motion atom object for a scale in or scale out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param outScale - Scale for the out pose. Defaults to 0.9.
 * @param inScale - Scale for the in pose. Defaults to 1.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with scale keyframes and the supplied duration and easing.
 * @deprecated Use `scale` with explicit `from` and `to` poses, or `scaleIn`/`scaleOut` when one pose is `1`.
 */
export const scaleAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outScale = 0.9,
  inScale = 1,
}: ScaleAtomParams): AtomMotion => {
  return scale({
    from: direction === 'enter' ? outScale : inScale,
    to: direction === 'enter' ? inScale : outScale,
    duration,
    easing,
    delay,
  });
};
