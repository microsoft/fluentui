import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface BlurAtomParams extends BaseAtomParams {
  fromRadius?: string;
}

/**
 * Generates a motion atom object for a blur-in or blur-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromRadius - The blur radius value with units (e.g., '20px', '1rem'). Defaults to '20px'.
 * @returns A motion atom object with filter blur keyframes and the supplied duration and easing.
 */
export const blurAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromRadius = '10px',
}: BlurAtomParams): AtomMotion => {
  const keyframes = [{ filter: `blur(${fromRadius})` }, { filter: 'blur(0px)' }];
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
