import { AtomMotion, PresenceDirection, motionTokens } from '@fluentui/react-motion';

interface FadeAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
  fromValue?: number;
}

/**
 * Generates a motion atom object for a fade in or fade out.
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
  fromValue = 0,
}: FadeAtomParams): AtomMotion => {
  const keyframes = [{ opacity: fromValue }, { opacity: 1 }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};
