import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import type { RotateParams } from '../components/Rotate/rotate-types';
import { BaseAtomParams } from '../types';

type Axis3D = NonNullable<RotateParams['axis']>;

interface RotateAtomParams extends BaseAtomParams {
  axis?: Axis3D;
  angle?: number;
  exitAngle?: number;
}

const createRotateValue = (axis: Axis3D, angle: number): string => {
  return `${axis.toLowerCase()} ${angle}deg`;
};

/**
 * Generates a motion atom object for a rotation around a single axis.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'y'.
 * @param angle - The starting rotation angle in degrees. Defaults to -90.
 * @param exitAngle - The ending rotation angle in degrees. Defaults to the negation of `angle`.
 * @returns A motion atom object with rotate keyframes and the supplied duration and easing.
 */
export const rotateAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  axis = 'y',
  angle = -90,
  exitAngle = -angle,
}: RotateAtomParams): AtomMotion => {
  let fromAngle = angle;
  let toAngle = 0;

  if (direction === 'exit') {
    fromAngle = 0;
    toAngle = exitAngle;
  }
  const keyframes = [{ rotate: createRotateValue(axis, fromAngle) }, { rotate: createRotateValue(axis, toAngle) }];

  return {
    keyframes,
    duration,
    easing,
    delay,
  };
};
