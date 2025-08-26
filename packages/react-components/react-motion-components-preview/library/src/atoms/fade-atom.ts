import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface FadeAtomParams extends BaseAtomParams {
  fromOpacity?: number;
}

/**
 * Generates a motion atom object for a fade-in or fade-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromValue - The starting opacity value. Defaults to 0.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 */
export const fadeAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromOpacity = 0,
}: FadeAtomParams): AtomMotion => {
  const keyframes = [{ opacity: fromOpacity }, { opacity: 1 }];
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
