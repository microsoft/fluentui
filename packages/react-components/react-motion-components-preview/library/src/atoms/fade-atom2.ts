import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';

export type FadeAtom2Params = {
  /** Time in milliseconds for the motion. */
  duration: number;
  /** Easing curve for the motion. Defaults to `motionTokens.curveLinear`. */
  easing?: EffectTiming['easing'];
  /** Time in milliseconds before the motion starts. Defaults to 0. */
  delay?: EffectTiming['delay'];
  /** Defines how values are applied before and after execution. */
  fill?: FillMode;
  /** Initial opacity. Defaults to 0. */
  fromOpacity?: number;
  /** Final opacity. Defaults to 1. */
  toOpacity?: number;
};

/**
 * Generates a directed fade motion atom from explicit start and end opacities.
 */
export const fadeAtom2 = ({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fill,
  fromOpacity = 0,
  toOpacity = 1,
}: FadeAtom2Params): AtomMotion => ({
  keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
  duration,
  easing,
  delay,
  ...(fill === undefined ? {} : { fill }),
});
