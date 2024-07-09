import {
  motionTokens,
  PresenceMotionFn,
  createPresenceComponent,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

const { durationGentle, durationNormal, durationSlow, durationFast, curveDecelerateMax, curveAccelerateMax } =
  motionTokens;

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
    enter: { duration: durationGentle, easing: curveDecelerateMax, keyframes: enterKeyframes },
    exit: { duration: durationNormal, easing: curveAccelerateMax, keyframes: exitKeyframes },
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scaleMotion);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  enter: { duration: durationNormal, easing: curveDecelerateMax },
  exit: { duration: durationFast, easing: curveAccelerateMax },
});

export const ScaleExaggerated = createPresenceComponentVariant(Scale, {
  enter: { duration: durationSlow, easing: curveDecelerateMax },
  exit: { duration: durationGentle, easing: curveAccelerateMax },
});
