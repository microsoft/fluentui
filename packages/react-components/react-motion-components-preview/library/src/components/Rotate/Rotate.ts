import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { rotateAtom } from '../../atoms/rotate-atom';
import { RotateParams } from './rotate-types';

/**
 * Define a presence motion for rotate in/out
 *
 * @param duration - Time (ms) for the enter transition (rotate-in). Defaults to the `durationGentle` value.
 * @param easing - Easing curve for the enter transition (rotate-in). Defaults to the `curveDecelerateMax` value.
 * @param exitDuration - Time (ms) for the exit transition (rotate-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (rotate-out). Defaults to the `curveAccelerateMax` value.
 * @param axis - The axis of rotation: 'x', 'y', or 'z'. Defaults to 'y'.
 * @param enterAngle - The starting rotation angle in degrees. Defaults to -90.
 * @param exitAngle - The ending rotation angle in degrees. Defaults to the negation of `enterAngle`.
 * @param animateOpacity - Whether to animate the opacity during the rotation. Defaults to `true`.
 */
const rotatePresenceFn: PresenceMotionFn<RotateParams> = ({
  axis = 'y',
  enterAngle = -90,
  exitAngle = -enterAngle,
  duration = motionTokens.durationGentle,
  exitDuration = duration,
  easing = motionTokens.curveDecelerateMax,
  exitEasing = motionTokens.curveAccelerateMax,
  animateOpacity = true,
}: RotateParams) => {
  const enterAtoms: AtomMotion[] = [
    rotateAtom({
      direction: 'enter',
      duration,
      easing,
      axis,
      enterAngle,
      exitAngle,
    }),
  ];

  const exitAtoms: AtomMotion[] = [
    rotateAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      axis,
      enterAngle,
      exitAngle,
    }),
  ];

  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

// Create a presence motion component to rotate an element around a single axis (x, y, or z).
export const Rotate = createPresenceComponent(rotatePresenceFn);
