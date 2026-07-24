import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { RotateParams } from '../components/Rotate/rotate-types';
import type { BaseAtomParams } from '../types';

type Axis3D = NonNullable<RotateParams['axis']>;

interface RotateAtomParams extends Omit<BaseAtomParams, 'direction'> {
  axis?: Axis3D;
  /** Rotation angle at the start of the directed motion in degrees. Defaults to -90. */
  fromAngle?: number;
  /** Rotation angle at the end of the directed motion in degrees. Defaults to 0. */
  toAngle?: number;
}

const createRotateValue = (axis: Axis3D, angle: number): string => {
  return `${axis.toLowerCase()} ${angle}deg`;
};

/**
 * Generates a motion atom object for a rotation around a single axis.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'y'.
 * @param fromAngle - Rotation angle at the start of the directed motion in degrees. Defaults to -90.
 * @param toAngle - Rotation angle at the end of the directed motion in degrees. Defaults to 0.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with rotate keyframes and the supplied duration and easing.
 */
export const rotateAtom = ({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  axis = 'z',
  fromAngle = -90,
  toAngle = 0,
}: RotateAtomParams): AtomMotion => ({
  keyframes: [{ rotate: createRotateValue(axis, fromAngle) }, { rotate: createRotateValue(axis, toAngle) }],
  duration,
  easing,
  delay,
});
