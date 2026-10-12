import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';

export type SlideAtom2Params = {
  /** Time in milliseconds for the motion. */
  duration: number;
  /** Easing curve for the motion. Defaults to `motionTokens.curveLinear`. */
  easing?: EffectTiming['easing'];
  /** Time in milliseconds before the motion starts. Defaults to 0. */
  delay?: EffectTiming['delay'];
  /** Defines how values are applied before and after execution. */
  fill?: FillMode;
  /** Initial X translation. Defaults to '0px'. */
  fromX?: string;
  /** Initial Y translation. Defaults to '0px'. */
  fromY?: string;
  /** Final X translation. Defaults to '0px'. */
  toX?: string;
  /** Final Y translation. Defaults to '0px'. */
  toY?: string;
};

/**
 * Generates a directed slide motion atom from explicit start and end translations.
 */
export const slideAtom2 = ({
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
  fill,
  fromX = '0px',
  fromY = '0px',
  toX = '0px',
  toY = '0px',
}: SlideAtom2Params): AtomMotion => ({
  keyframes: [{ translate: `${fromX} ${fromY}` }, { translate: `${toX} ${toY}` }],
  duration,
  easing,
  delay,
  ...(fill === undefined ? {} : { fill }),
});
