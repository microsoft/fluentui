import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createPresenceComponentVariant } from '@fluentui/react-motion';
import { fade } from '../../atoms/fade-atom';
import type { FadeParams } from './fade-types';

/**
 * Defines enter opacity from `fromOpacity` to `inOpacity` and exit opacity from `inOpacity` to `toOpacity`.
 *
 * @param duration - Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms).
 * @param easing - Easing curve for the enter transition (fade-in). Defaults to the `curveEasyEase` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (fade-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (fade-out). Defaults to the `easing` param for symmetry.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromOpacity - Opacity before entering. Defaults to 0.
 * @param inOpacity - Opacity for the in pose. Defaults to 1.
 * @param toOpacity - Opacity after exiting. Defaults to `fromOpacity`.
 */
export const fadePresenceFn: PresenceMotionFn<FadeParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  exitDuration = duration,
  exitEasing = easing,
  exitDelay = delay,
  fromOpacity = 0,
  inOpacity = 1,
  toOpacity = fromOpacity,
}) => {
  return {
    enter: fade({ from: fromOpacity, to: inOpacity, duration, easing, delay }),
    exit: fade({
      from: inOpacity,
      to: toOpacity,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
    }),
  };
};

/**
 * Animates a child's presence from `fromOpacity` to `inOpacity` on enter and from `inOpacity` to `toOpacity` on exit.
 * The default exit returns to `fromOpacity`.
 * `Fade.In` and `Fade.Out` play once on mount from `fromOpacity` to `toOpacity`; `inOpacity` is root-only.
 */
export const Fade = createPresenceComponent(fadePresenceFn, {
  poseProps: [{ from: 'fromOpacity', in: 'inOpacity', to: 'toOpacity' }],
});

/** Fade with `durationFast` (150 ms) for both enter and exit. */
export const FadeSnappy = createPresenceComponentVariant(Fade, { duration: motionTokens.durationFast });

/** Fade with `durationGentle` (250 ms) for both enter and exit. */
export const FadeRelaxed = createPresenceComponentVariant(Fade, { duration: motionTokens.durationGentle });
