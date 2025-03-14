import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

/** Define a presence motion for scale in/out */
const scalePresenceFn: PresenceMotionFn<{
  duration?: number;
  easing?: string;
  exitDuration?: number;
  exitEasing?: string;
  fromScale?: number;
  animateOpacity?: boolean;
}> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMid,
  fromScale = 0.9,
  animateOpacity = true,
}) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const toScale = 1;

  // TODO: use fadeAtom
  // TODO: make scaleAtom
  const enterKeyframes = [
    { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'visible' },
    { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, transform: `scale3d(${toScale}, ${toScale}, 1)` },
    { opacity: fromOpacity, transform: `scale3d(${fromScale}, ${fromScale}, 1)`, visibility: 'hidden' },
  ];

  return {
    enter: {
      duration,
      easing,
      keyframes: enterKeyframes,
    },
    exit: { duration: exitDuration, easing: exitEasing, keyframes: exitKeyframes },
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scalePresenceFn);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationFast,
  easing: motionTokens.curveDecelerateMax,
  exitEasing: motionTokens.curveAccelerateMax,
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationGentle,
  easing: motionTokens.curveDecelerateMid,
  exitEasing: motionTokens.curveAccelerateMid,
});
