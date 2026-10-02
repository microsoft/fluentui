import type { AtomMotion, PresenceMotionFn } from '@fluentui/react-motion';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { rotate } from '../../atoms/rotate-atom';
import type { RotateParams } from './rotate-types';

/**
 * Defines enter rotation from `fromAngle` to `inAngle` and exit rotation from `inAngle` to `toAngle`.
 *
 * @param duration - Time (ms) for the enter transition. Defaults to `durationGentle` (250 ms).
 * @param easing - Easing curve for the enter transition (rotate-in). Defaults to the `curveDecelerateMax` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (rotate-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (rotate-out). Defaults to the `curveAccelerateMax` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'z'.
 * @param fromAngle - Rotation before entering, in degrees. Defaults to -90.
 * @param inAngle - Rotation while present, in degrees. Defaults to 0.
 * @param toAngle - Rotation after exiting, in degrees. Defaults to `fromAngle`.
 * @param animateOpacity - Adds opacity from 0 to 1 on enter and 1 to 0 on exit. Defaults to `true`.
 */
const rotatePresenceFn: PresenceMotionFn<RotateParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMax,
  exitDelay = delay,
  axis = 'z',
  fromAngle = -90,
  inAngle = 0,
  toAngle = fromAngle,
  animateOpacity = true,
}: RotateParams) => {
  const enterAtoms: AtomMotion[] = [
    rotate({
      from: fromAngle,
      to: inAngle,
      duration,
      easing,
      delay,
      axis,
    }),
  ];

  const exitAtoms: AtomMotion[] = [
    rotate({
      from: inAngle,
      to: toAngle,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      axis,
    }),
  ];

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
 * Animates presence from `fromAngle` to `inAngle` on enter and from `inAngle` to `toAngle` on exit.
 * The default exit returns to `fromAngle`. Angles are in degrees around `axis` (default `'z'`).
 * Opacity also animates from 0 to 1 on enter and 1 to 0 on exit unless `animateOpacity` is false.
 * `Rotate.In` and `Rotate.Out` play once from `fromAngle` to `toAngle`; `inAngle` is root-only.
 */
export const Rotate = createPresenceComponent(rotatePresenceFn, {
  poseProps: [{ from: 'fromAngle', in: 'inAngle', to: 'toAngle' }],
});
