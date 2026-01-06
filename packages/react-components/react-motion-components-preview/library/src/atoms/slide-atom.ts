import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface SlideAtomParams extends BaseAtomParams {
  fromX?: string;
  fromY?: string;
  toX?: string;
  toY?: string;
}

/**
 * Generates a motion atom object for a slide-in or slide-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromX - The starting X translate value with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param fromY - The starting Y translate value with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param toX - The ending X translate value with units (e.g.'5px', '10%'). Defaults to '0px'.
 * @param toY - The ending Y translate value with units (e.g., '5px', '10%'). Defaults to '0px'.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromX = '0px',
  fromY = '0px',
  toX = '0px',
  toY = '0px',
}: SlideAtomParams): AtomMotion => {
  const keyframes = [{ translate: `${fromX} ${fromY}` }, { translate: `${toX} ${toY}` }];
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
