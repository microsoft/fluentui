import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { MotionTiming } from '../types';

/** The axis of an absolute rotation. */
export type RotateAxis = 'x' | 'y' | 'z';

/** A rotation angle in degrees. */
export type RotatePose = number;

/**
 * Explicit rotation endpoints in degrees. Both `from` and `to` are required;
 * use `rotateIn` or `rotateOut` when arriving at or departing from `0` degrees.
 */
export type RotateOptions = MotionTiming & {
  axis?: RotateAxis;
  from: RotatePose;
  to: RotatePose;
};

/** Options for rotating from an authored angle to 0 degrees. */
export type RotateInOptions = MotionTiming & { axis?: RotateAxis; from: RotatePose; to?: never };

/** Options for rotating from 0 degrees to an authored angle. */
export type RotateOutOptions = MotionTiming & { axis?: RotateAxis; from?: never; to: RotatePose };

/**
 * Creates an absolute rotation between explicit `from` and `to` angles around a single axis,
 * without adding opacity or fill. The default axis is `'z'`.
 *
 * @example
 * ```ts
 * rotate({ from: -90, to: 45, axis: 'y', duration: 250 });
 * rotateIn({ from: -90, duration: 250 }); // -90 to 0 degrees
 * rotateOut({ to: 90, duration: 250 }); // 0 to 90 degrees
 * ```
 */
export const rotate = ({
  from,
  to,
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
  rotate({ from, to: 0, axis, duration, easing, delay });

/** Creates an absolute rotation from 0 degrees to an authored angle. */
export const rotateOut = ({ to, axis, duration, easing, delay }: RotateOutOptions): AtomMotion =>
  rotate({ from: 0, to, axis, duration, easing, delay });
