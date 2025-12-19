import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { rotateAtom } from '../../atoms/rotate-atom';
import { RotateParams } from './rotate-types';

/**
 * Define a presence motion for rotate in/out
 *
 * @param duration - Time (ms) for the enter transition (rotate-in). Defaults to the `durationGentle` value.
 * @param easing - Easing curve for the enter transition (rotate-in). Defaults to the `curveDecelerateMax` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (rotate-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (rotate-out). Defaults to the `curveAccelerateMax` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'z'.
 * @param outAngle - Rotation angle for the out state (exited) in degrees. Defaults to -90.
 * @param inAngle - Rotation angle for the in state (entered) in degrees. Defaults to 0.
 * @param animateOpacity - Whether to animate the opacity during the rotation. Defaults to `true`.
 */
const rotatePresenceFn: PresenceMotionFn<RotateParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMax,
  exitDelay = delay,
  axis = 'z',
  outAngle = -90,
  inAngle = 0,
  animateOpacity = true,
}: RotateParams) => {
  const enterAtoms: AtomMotion[] = [
    rotateAtom({
      direction: 'enter',
      duration,
      easing,
      delay,
      axis,
      outAngle,
      inAngle,
    }),
  ];

  const exitAtoms: AtomMotion[] = [
    rotateAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      axis,
      outAngle,
      inAngle,
    }),
  ];

  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing, delay }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

// Create a presence motion component to rotate an element around a single axis (x, y, or z).
export const Rotate = createPresenceComponent(rotatePresenceFn);
