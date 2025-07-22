import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { rotateAtom, Axis3D } from '../../atoms/rotate-atom';

/**
 * Parameters for configuring the Rotate motion.
 */
export type RotateParams = {
  /**
   * Time (ms) for the enter transition (rotate-in).
   * Defaults to `motionTokens.durationGentle`.
   */
  duration?: number;

  /**
   * Easing curve for the enter transition (rotate-in).
   * Defaults to `motionTokens.curveDecelerateMax`.
   */
  easing?: string;

  /**
   * Time (ms) for the exit transition (rotate-out).
   * Defaults to the value of `duration`.
   */
  exitDuration?: number;

  /**
   * Easing curve for the exit transition (rotate-out).
   * Defaults to `motionTokens.curveAccelerateMax`.
   */
  exitEasing?: string;

  /**
   * The axis of rotation: 'X', 'Y', or 'Z'.
   * Defaults to 'Y'.
   */
  axis?: Axis3D;

  /**
   * The starting rotation angle in degrees.
   * Defaults to -90.
   */
  enterAngle?: number;

  /**
   * The ending rotation angle in degrees.
   * Defaults to the negation of `enterAngle`.
   */
  exitAngle?: number;

  /**
   * Whether to animate the opacity during the rotation.
   * Defaults to `true`.
   */
  animateOpacity?: boolean;
};

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

// Create a presence motion component to rotate an element around a single axis (X, Y, or Z).
export const Rotate = createPresenceComponent(rotatePresenceFn);
