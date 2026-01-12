import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface FadeAtomParams extends BaseAtomParams {
  /** Defines how values are applied before and after execution. Defaults to 'both'. */
  fill?: FillMode;

  /** Opacity for the out state (exited). Defaults to 0. */
  outOpacity?: number;

  /** Opacity for the in state (entered). Defaults to 1. */
  inOpacity?: number;
}

/**
 * Generates a motion atom object for a fade-in or fade-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param delay - The delay before the motion starts. Defaults to 0.
 * @param outOpacity - Opacity for the out state (exited). Defaults to 0.
 * @param inOpacity - Opacity for the in state (entered). Defaults to 1.
 * @returns A motion atom object with opacity keyframes and the supplied duration and easing.
 */
export const fadeAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outOpacity = 0,
  inOpacity = 1,
}: FadeAtomParams): AtomMotion => {
  const keyframes = [{ opacity: outOpacity }, { opacity: inOpacity }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
    delay,
    // Applying opacity backwards and forwards in time is important
    // to avoid a bug where a delayed animation is not hidden when it should be.
    fill: 'both',
  };
};
