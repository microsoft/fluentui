import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface ScaleAtomParams extends BaseAtomParams {
  /** Scale for the out state (exited). Defaults to 0.9. */
  outScale?: number;
  /** Scale for the in state (entered). Defaults to 1. */
  inScale?: number;
}

/**
 * Generates a motion atom object for a scale in or scale out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param outScale - Scale for the out state (exited). Defaults to 0.9.
 * @param inScale - Scale for the in state (entered). Defaults to 1.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with scale keyframes and the supplied duration and easing.
 */
export const scaleAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outScale = 0.9,
  inScale = 1,
}: ScaleAtomParams): AtomMotion => {
  const keyframes = [{ scale: outScale }, { scale: inScale }];
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
