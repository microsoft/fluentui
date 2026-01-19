import { AtomMotion, motionTokens } from '@fluentui/react-motion';
import { BaseAtomParams } from '../types';

interface SlideAtomParams extends BaseAtomParams {
  /** X translate for the out state (exited). Defaults to '0px'. */
  outX?: string;
  /** Y translate for the out state (exited). Defaults to '0px'. */
  outY?: string;
  /** X translate for the in state (entered). Defaults to '0px'. */
  inX?: string;
  /** Y translate for the in state (entered). Defaults to '0px'. */
  inY?: string;
}

/**
 * Generates a motion atom object for a slide-in or slide-out.
 * @param direction - The functional direction of the motion: 'enter' or 'exit'.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param outX - X translate for the out state (exited) with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param outY - Y translate for the out state (exited) with units (e.g., '50px', '100%'). Defaults to '0px'.
 * @param inX - X translate for the in state (entered) with units (e.g., '5px', '10%'). Defaults to '0px'.
 * @param inY - Y translate for the in state (entered) with units (e.g., '5px', '10%'). Defaults to '0px'.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with translate keyframes and the supplied duration and easing.
 */
export const slideAtom = ({
  direction,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  outX = '0px',
  outY = '0px',
  inX = '0px',
  inY = '0px',
}: SlideAtomParams): AtomMotion => {
  const keyframes = [{ translate: `${outX} ${outY}` }, { translate: `${inX} ${inY}` }];
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
