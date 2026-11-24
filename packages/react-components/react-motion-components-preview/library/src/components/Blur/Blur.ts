import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { blur } from '../../atoms/blur-atom';
import type { BlurParams } from './blur-types';

/**
 * Defines enter blur from `fromRadius` to `inRadius` and exit blur from `inRadius` to `toRadius`.
 *
 * @param duration - Time (ms) for the enter transition (blur-in). Defaults to the `durationSlow` value (300 ms).
 * @param easing - Easing curve for the enter transition (blur-in). Defaults to the `curveDecelerateMin` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (blur-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (blur-out). Defaults to the `curveAccelerateMin` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromRadius - Blur before entering. Defaults to `'10px'`.
 * @param inRadius - Blur while present. Defaults to `'0px'`.
 * @param toRadius - Blur after exiting. Defaults to `fromRadius`.
 * @param animateOpacity - Adds opacity from 0 to 1 on enter and 1 to 0 on exit. Defaults to `true`.
 */
const blurPresenceFn: PresenceMotionFn<BlurParams> = ({
  duration = motionTokens.durationSlow,
  easing = motionTokens.curveDecelerateMin,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMin,
  exitDelay = delay,
  fromRadius = '10px',
  inRadius = '0px',
  toRadius = fromRadius,
  animateOpacity = true,
}) => {
  const enterAtoms = [blur({ from: fromRadius, to: inRadius, duration, easing, delay })];
  const exitAtoms = [
    blur({
      from: inRadius,
      to: toRadius,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeIn({ duration, easing, delay }));
    exitAtoms.push(fadeOut({ duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/**
 * Animates presence from `fromRadius` to `inRadius` on enter and from `inRadius` to `toRadius` on exit.
 * The default exit returns to `fromRadius`. Radii are CSS lengths.
 * Opacity also animates from 0 to 1 on enter and 1 to 0 on exit unless `animateOpacity` is false.
 * `Blur.In` and `Blur.Out` play once from `fromRadius` to `toRadius`; `inRadius` is root-only.
 */
export const Blur = createPresenceComponent(blurPresenceFn, {
  poseProps: [{ from: 'fromRadius', in: 'inRadius', to: 'toRadius' }],
});
