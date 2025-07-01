import { AtomMotion, PresenceDirection, motionTokens } from '@fluentui/react-motion';

interface ScaleAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
  fromValue?: number;
  toValue?: number;
}

/**
 * Generates a motion atom object for a scale in or scale out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromValue - The starting scale value. Defaults to 0.9.
 * @param toValue - The ending scale value. Defaults to 1.
 * @returns A motion atom object with scale keyframes and the supplied duration and easing.
 */
export const scaleAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  fromValue = 0.9,
  toValue = 1,
}: ScaleAtomParams): AtomMotion => {
  const keyframes = [{ scale: fromValue }, { scale: toValue }];
  if (direction === 'exit') {
    keyframes.reverse();
  }
  return {
    keyframes,
    duration,
    easing,
  };
};
