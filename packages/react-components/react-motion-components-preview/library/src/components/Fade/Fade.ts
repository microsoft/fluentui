import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { FadeParams } from './fade-types';

/**
 * Define a presence motion for fade in/out
 *
 * @param duration - Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms).
 * @param easing - Easing curve for the enter transition (fade-in). Defaults to the `curveEasyEase` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (fade-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (fade-out). Defaults to the `easing` param for symmetry.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param outOpacity - Opacity for the out state (exited). Defaults to 0.
 * @param inOpacity - Opacity for the in state (entered). Defaults to 1.
 */
export const fadePresenceFn: PresenceMotionFn<FadeParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  exitDuration = duration,
  exitEasing = easing,
  exitDelay = delay,
  outOpacity = 0,
  inOpacity = 1,
}) => {
  return {
    enter: fadeAtom({ direction: 'enter', duration, easing, delay, outOpacity, inOpacity }),
    exit: fadeAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      outOpacity,
      inOpacity,
    }),
  };
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(fadePresenceFn);

export const FadeSnappy = createPresenceComponentVariant(Fade, { duration: motionTokens.durationFast });

export const FadeRelaxed = createPresenceComponentVariant(Fade, { duration: motionTokens.durationGentle });
