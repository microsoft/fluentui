import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createPresenceComponentVariant } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { scale } from '../../atoms/scale-atom';
import type { ScaleParams } from './scale-types';

/**
 * Define a presence motion for scale in/out
 *
 * @param duration - Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms).
 * @param easing - Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms).
 * @param exitEasing - Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromScale - Scale before entering. Defaults to `0.9`.
 * @param inScale - Scale for the in pose. Defaults to `1`.
 * @param toScale - Scale after exiting. Defaults to `fromScale`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const scalePresenceFn: PresenceMotionFn<ScaleParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  delay = 0,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  exitDelay = delay,
  fromScale = 0.9,
  inScale = 1,
  toScale = fromScale,
  animateOpacity = true,
}) => {
  const enterAtoms = [scale({ from: fromScale, to: inScale, duration, easing, delay })];
  const exitAtoms = [
    scale({
      from: inScale,
      to: toScale,
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

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scalePresenceFn, {
  poses: [{ from: 'fromScale', in: 'inScale', to: 'toScale' }],
});

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast,
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle,
});
