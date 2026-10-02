import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams, MotionTiming, PoseEndpoints } from '../types';

/** A CSS length used as a blur-radius pose. */
export type BlurPose = string;

/** Blur endpoints; an omitted endpoint defaults to `'0px'`. At least one endpoint is required. */
export type BlurOptions = MotionTiming & PoseEndpoints<BlurPose>;

/** Options for blurring from an authored radius to `'0px'`. */
export type BlurInOptions = MotionTiming & { from: BlurPose; to?: never };

/** Options for blurring from `'0px'` to an authored radius. */
export type BlurOutOptions = MotionTiming & { from?: never; to: BlurPose };

/**
 * Creates an absolute blur motion between authored radii, without adding opacity or fill.
 * At least one endpoint is required; an omitted endpoint is `'0px'`. Radii are CSS lengths including units.
 *
 * @example
 * ```ts
 * blur({ from: '10px', to: '2px', duration: 300 });
 * blurIn({ from: '1rem', duration: 300 }); // 1rem to 0px
 * blurOut({ to: '10px', duration: 300 }); // 0px to 10px
 * ```
 */
export const blur = ({
  from = '0px',
  to = '0px',
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
  blur({ from, duration, easing, delay });

/** Creates an absolute blur motion from `'0px'` to an authored radius. */
export const blurOut = ({ to, duration, easing, delay }: BlurOutOptions): AtomMotion =>
  blur({ to, duration, easing, delay });

interface BlurAtomParams extends BaseAtomParams {
  /** Blur radius for the out state (exited). Defaults to '10px'. */
  outRadius?: string;
  /** Blur radius for the in state (entered). Defaults to '0px'. */
  inRadius?: string;
}

/**
 * Generates a motion atom object for a blur-in or blur-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param outRadius - Blur radius for the out state (exited) with units (e.g., '20px', '1rem'). Defaults to '10px'.
 * @param inRadius - Blur radius for the in state (entered) with units (e.g., '0px', '5px'). Defaults to '0px'.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with filter blur keyframes and the supplied duration and easing.
 * @deprecated Use `blur` with explicit `from` and `to` poses, or `blurIn`/`blurOut` when one pose is `'0px'`.
 */
export const blurAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outRadius = '10px',
  inRadius = '0px',
}: BlurAtomParams): AtomMotion => {
  return blur({
    from: direction === 'enter' ? outRadius : inRadius,
    to: direction === 'enter' ? inRadius : outRadius,
    duration,
    easing,
    delay,
  });
};
