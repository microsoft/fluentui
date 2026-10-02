import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams, MotionTiming, PoseEndpoints } from '../types';

/** The axis of an absolute rotation. */
export type RotateAxis = 'x' | 'y' | 'z';

/** A rotation angle in degrees. */
export type RotatePose = number;

/** Rotation endpoints; an omitted endpoint defaults to 0 degrees. At least one endpoint is required. */
export type RotateOptions = MotionTiming & PoseEndpoints<RotatePose> & { axis?: RotateAxis };

/** Options for rotating from an authored angle to 0 degrees. */
export type RotateInOptions = MotionTiming & { axis?: RotateAxis; from: RotatePose; to?: never };

/** Options for rotating from 0 degrees to an authored angle. */
export type RotateOutOptions = MotionTiming & { axis?: RotateAxis; from?: never; to: RotatePose };

/**
 * Creates an absolute rotation between authored angles around a single axis, without adding opacity or fill.
 * At least one endpoint is required; an omitted endpoint is 0 degrees. The default axis is `'z'`.
 *
 * @example
 * ```ts
 * rotate({ from: -90, to: 45, axis: 'y', duration: 250 });
 * rotateIn({ from: -90, duration: 250 }); // -90 to 0 degrees
 * rotateOut({ to: 90, duration: 250 }); // 0 to 90 degrees
 * ```
 */
export const rotate = ({
  from = 0,
  to = 0,
  axis = 'z',
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: RotateOptions): AtomMotion => ({
  keyframes: [{ rotate: `${axis.toLowerCase()} ${from}deg` }, { rotate: `${axis.toLowerCase()} ${to}deg` }],
  duration,
  easing,
  delay,
});

/** Creates an absolute rotation from an authored angle to 0 degrees. */
export const rotateIn = ({ from, axis, duration, easing, delay }: RotateInOptions): AtomMotion =>
  rotate({ from, axis, duration, easing, delay });

/** Creates an absolute rotation from 0 degrees to an authored angle. */
export const rotateOut = ({ to, axis, duration, easing, delay }: RotateOutOptions): AtomMotion =>
  rotate({ to, axis, duration, easing, delay });

interface RotateAtomParams extends BaseAtomParams {
  axis?: RotateAxis;
  /** Rotation angle for the out state (exited) in degrees. Defaults to -90. */
  outAngle?: number;
  /** Rotation angle for the in state (entered) in degrees. Defaults to 0. */
  inAngle?: number;
}

/**
 * Generates a motion atom object for a rotation around a single axis.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'z'.
 * @param outAngle - Rotation angle for the out state (exited) in degrees. Defaults to -90.
 * @param inAngle - Rotation angle for the in state (entered) in degrees. Defaults to 0.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with rotate keyframes and the supplied duration and easing.
 * @deprecated Use `rotate` with explicit `from` and `to` poses, or `rotateIn`/`rotateOut` when one pose is 0 degrees.
 */
export const rotateAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  axis = 'z',
  outAngle = -90,
  inAngle = 0,
}: RotateAtomParams): AtomMotion => {
  return rotate({
    from: direction === 'enter' ? outAngle : inAngle,
    to: direction === 'enter' ? inAngle : outAngle,
    axis,
    duration,
    easing,
    delay,
  });
};
