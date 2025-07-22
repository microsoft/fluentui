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
   * The starting X-axis rotation angle, in degrees.
   * Defaults to 0.
   */
  fromX?: number;

  /**
   * The starting Y-axis rotation angle, in degrees.
   * Defaults to -90.
   */
  fromY?: number;

  /**
   * The starting Z-axis rotation angle, in degrees.
   * Defaults to 0.
   */
  fromZ?: number;

  /**
   * The ending X-axis rotation angle, in degrees.
   * Defaults to the negation of `fromX`.
   */
  toX?: number;

  /**
   * The ending Y-axis rotation angle, in degrees.
   * Defaults to the negation of `fromY`.
   */
  toY?: number;

  /**
   * The ending Z-axis rotation angle, in degrees.
   * Defaults to the negation of `fromZ`.
   */
  toZ?: number;

  /**
   * Whether to animate the opacity during the rotation.
   * Defaults to `true`.
   */
  animateOpacity?: boolean;
};

const createRotateValue = (x: number, y: number, z: number): string => {
  const rotations = [];

  if (x !== 0) {
    rotations.push(`x ${x}deg`);
  }
  if (y !== 0) {
    rotations.push(`y ${y}deg`);
  }
  if (z !== 0) {
    rotations.push(`z ${z}deg`);
  }

  return rotations.length > 0 ? rotations.join(' ') : '0deg';
};

const rotatePresenceFn: PresenceMotionFn<RotateParams> = ({
  // element,
  fromX = 0,
  fromY = -90,
  fromZ = 0,
  toX = -fromX,
  toY = -fromY,
  toZ = -fromZ,
  duration = motionTokens.durationGentle,
  exitDuration = duration,
  easing = motionTokens.curveDecelerateMax,
  exitEasing = motionTokens.curveAccelerateMax,
  animateOpacity = true,
}: RotateParams) => {
  const enterAtoms: AtomMotion[] = [
    {
      keyframes: [{ rotate: createRotateValue(fromX, fromY, fromZ) }, { rotate: createRotateValue(0, 0, 0) }],
      duration,
      easing,
    },
  ];

  const exitAtoms: AtomMotion[] = [
    {
      keyframes: [{ rotate: createRotateValue(0, 0, 0) }, { rotate: createRotateValue(toX, toY, toZ) }],
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

// Create a presence motion component to rotate an element around the X, Y, and/or Z axes.
export const Rotate = createPresenceComponent(rotatePresenceFn);
