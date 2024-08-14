import {
  motionTokens,
  PresenceMotionFn,
  createPresenceComponent,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

/** Define a presence motion for scale in/out */
const scaleMotion: PresenceMotionFn<{ animateOpacity?: boolean }> = ({ animateOpacity = true }) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromScale = 0.9; // Could be a custom param in the future
  const toScale = 1;

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
      duration: motionTokens.durationGentle,
      easing: motionTokens.curveDecelerateMax,
      keyframes: enterKeyframes,
    },
    exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveAccelerateMax, keyframes: exitKeyframes },
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scaleMotion);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  enter: { duration: motionTokens.durationNormal, easing: motionTokens.curveDecelerateMax },
  exit: { duration: motionTokens.durationFast, easing: motionTokens.curveAccelerateMax },
});

export const ScaleExaggerated = createPresenceComponentVariant(Scale, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveDecelerateMax },
  exit: { duration: motionTokens.durationGentle, easing: motionTokens.curveAccelerateMax },
});
