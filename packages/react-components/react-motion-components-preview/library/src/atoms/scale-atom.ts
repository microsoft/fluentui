import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface ScaleAtomParams extends BaseAtomParams {
  fromScale?: number;
  toScale?: number;
}

/**
 * Generates a motion atom object for a scale in or scale out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromScale - The starting scale value. Defaults to 0.9.
 * @param toScale - The ending scale value. Defaults to 1.
 * @returns A motion atom object with scale keyframes and the supplied duration and easing.
 */
export const scaleAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromScale = 0.9,
  toScale = 1,
}: ScaleAtomParams): AtomMotion => {
  const keyframes = [{ scale: fromScale }, { scale: toScale }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
  };
};
