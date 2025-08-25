import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface SlideAtomParams extends BaseAtomParams {
  fromX?: string;
  fromY?: string;
}

/**
 * Generates a motion atom object for a slide-in or slide-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromX - The starting X translate value with units (e.g., '0px', '100%'). Defaults to '0px'.
 * @param fromY - The starting Y translate value with units (e.g., '-20px', '100%'). Defaults to '0px'.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromX = '0px',
  fromY = '20px',
}: SlideAtomParams): AtomMotion => {
  const keyframes = [{ translate: `${fromX} ${fromY}` }, { translate: '0px 0px' }];
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
