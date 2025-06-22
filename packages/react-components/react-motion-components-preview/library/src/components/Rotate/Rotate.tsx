import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';

type RotateRuntimeParams = {
  /** The axis to rotate around. */
  axis?: 'X' | 'Y' | 'Z';
  enterAngle?: number;
  exitAngle?: number;
  // perspective?: string;

  /** The duration of the animation in milliseconds. */
  enterDuration?: number;
  exitDuration?: number;
  enterEasing?: string;
  exitEasing?: string;
  /** Whether to animate the opacity. Defaults to `true`. */
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

const rotatePresenceFn: PresenceMotionFn<RotateRuntimeParams> = ({
  // element,
  axis = 'Y',
  enterAngle = -90,
  exitAngle = -enterAngle,
  enterDuration = 500,
  exitDuration = enterDuration,
  enterEasing = motionTokens.curveDecelerateMin,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}: RotateRuntimeParams) => {
  const enterAtoms: AtomMotion[] = [
    {
      keyframes: [{ transform: rotate3dStr(axis, enterAngle) }, { transform: rotate3dStr(axis, 0) }],
      duration: enterDuration,
      easing: enterEasing,
    },
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: enterDuration, easing: enterEasing }));
  }

  const exitAtoms: AtomMotion[] = [
    {
      keyframes: [{ transform: rotate3dStr(axis, 0) }, { transform: rotate3dStr(axis, exitAngle) }],
      duration: exitDuration,
      easing: exitEasing,
    },
  ];
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

// Create a presence motion component to rotate an element from one angle to another, around the X, Y or Z axis.
export const Rotate = createPresenceComponent(rotatePresenceFn);

// TODO: test Rotate.In and .Out
