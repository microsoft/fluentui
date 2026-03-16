import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

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
 */
export const blurAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outRadius = '10px',
  inRadius = '0px',
}: BlurAtomParams): AtomMotion => {
  const keyframes = [{ filter: `blur(${outRadius})` }, { filter: `blur(${inRadius})` }];
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
