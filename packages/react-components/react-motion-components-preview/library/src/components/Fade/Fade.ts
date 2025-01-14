import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import type { PresenceMotionCreator } from '../../types';

type FadeVariantParams = {
  /** Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition (fade-in). Defaults to the `easeEase` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition (fade-out). Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (fade-out). Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};

/** Define a presence motion for fade in/out  */
export const createFadePresence: PresenceMotionCreator<FadeVariantParams> = ({
  enterDuration = motionTokens.durationNormal,
  enterEasing = motionTokens.curveEasyEase,
  exitDuration = enterDuration,
  exitEasing = enterEasing,
} = {}) => ({
  enter: { duration: enterDuration, easing: enterEasing, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  exit: { duration: exitDuration, easing: exitEasing, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
});

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(createFadePresence());

export const FadeSnappy = createPresenceComponent(createFadePresence({ enterDuration: motionTokens.durationFast }));

export const FadeRelaxed = createPresenceComponent(createFadePresence({ enterDuration: motionTokens.durationGentle }));
