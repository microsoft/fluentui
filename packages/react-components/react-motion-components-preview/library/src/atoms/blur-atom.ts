import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { BaseAtomParams } from '../types';

interface BlurAtomParams extends Omit<BaseAtomParams, 'direction'> {
  /** Blur radius at the start of the motion. Defaults to '10px'. */
  fromRadius?: string;
  /** Blur radius at the end of the motion. Defaults to '0px'. */
  toRadius?: string;
}

/**
 * Generates a directed blur motion atom.
 * @param duration - The duration of the motion in milliseconds.
 * @param easing - The easing curve for the motion. Defaults to `motionTokens.curveLinear`.
 * @param fromRadius - Initial blur radius with units (e.g., '20px', '1rem'). Defaults to '10px'.
 * @param toRadius - Final blur radius with units. Defaults to '0px'.
 * @param delay - Time (ms) to delay the animation. Defaults to 0.
 * @returns A motion atom object with filter blur keyframes and the supplied duration and easing.
 */
export const blurAtom = ({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fromRadius = '10px',
  toRadius = '0px',
}: BlurAtomParams): AtomMotion => ({
  keyframes: [{ filter: `blur(${fromRadius})` }, { filter: `blur(${toRadius})` }],
  duration,
  easing,
  delay,
});
