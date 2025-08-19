import { AtomMotion, PresenceDirection, motionTokens } from '@fluentui/react-motion';

interface BlurAtomParams {
  direction: PresenceDirection;
  duration: number;
  easing?: string;
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
  };
};
