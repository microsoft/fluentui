import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';

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
   * Time (ms) for the enter transition (rotate-in).
   * Defaults to the value of `duration`.
   */
  exitDuration?: number;

  /**
   * Easing curve for the exit transition (rotate-out).
   * Defaults to `motionTokens.curveAccelerateMax`.
   */
  exitEasing?: string;

  /**
   * The axis to rotate around. Can be 'X', 'Y', or 'Z'.
   * Defaults to 'Y'.
   */
  axis?: 'X' | 'Y' | 'Z';

  /**
   * The starting angle for the rotation, in degrees.
   * Defaults to -90.
   */
  fromAngle?: number;

  /**
   * The ending angle for the rotation, in degrees.
   * Defaults to the negation of `fromAngle`.
   */
  toAngle?: number;

  /**
   * Whether to animate the opacity during the rotation.
   * Defaults to `true`.
   */
  animateOpacity?: boolean;
};

const vectorsByAxis = {
  X: '1, 0, 0',
  Y: '0, 1, 0',
  Z: '0, 0, 1',
};

const rotate3dStr = (axis: 'X' | 'Y' | 'Z', angle: number): string => {
  const axisVector = vectorsByAxis[axis];
  return `rotate3d(${axisVector}, ${angle}deg)`;
};

const rotatePresenceFn: PresenceMotionFn<RotateParams> = ({
  // element,
  axis = 'Y',
  fromAngle = -90,
  toAngle = -fromAngle,
  duration = motionTokens.durationGentle,
  exitDuration = duration,
  easing = motionTokens.curveDecelerateMax,
  exitEasing = motionTokens.curveAccelerateMax,
  animateOpacity = true,
}: RotateParams) => {
  const enterAtoms: AtomMotion[] = [
    {
      keyframes: [{ transform: rotate3dStr(axis, fromAngle) }, { transform: rotate3dStr(axis, 0) }],
      duration,
      easing,
    },
  ];

  const exitAtoms: AtomMotion[] = [
    {
      keyframes: [{ transform: rotate3dStr(axis, 0) }, { transform: rotate3dStr(axis, toAngle) }],
      duration: exitDuration,
      easing: exitEasing,
    },
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

// Create a presence motion component to rotate an element from one angle to another, around the X, Y or Z axis.
export const Rotate = createPresenceComponent(rotatePresenceFn);
