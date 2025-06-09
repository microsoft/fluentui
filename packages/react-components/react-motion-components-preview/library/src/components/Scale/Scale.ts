import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

type ScaleVariantParams = {
  /** Time (ms) for the enter transition (scale-in). Defaults to the `durationNormal` value (200 ms). */
  duration?: number;

  /** Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMid` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (scale-out). Defaults to the `duration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMid` value.  */
  exitEasing?: string;

  /** The scale value to animate from. Defaults to `0.9`. */
  fromScale?: number;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

/** Define a presence motion for scale in/out */
const scalePresenceFn: PresenceMotionFn<ScaleVariantParams> = ({
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
