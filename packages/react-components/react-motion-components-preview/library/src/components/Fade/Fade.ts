import { motionTokens, createPresenceComponent, PresenceMotionCreator, PresenceParams } from '@fluentui/react-motion';

const { durationNormal, durationFast, durationGentle, curveEasyEase } = motionTokens;

/** Define a presence motion for fade in/out  */
const createFadeMotion: PresenceMotionCreator<PresenceParams> = ({
  enterDuration = durationNormal,
  exitDuration = durationNormal,
  enterEasing = curveEasyEase,
  exitEasing = curveEasyEase,
} = {}) => ({
  enter: { duration: enterDuration, easing: enterEasing, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  exit: { duration: exitDuration, easing: exitEasing, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
});

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(createFadeMotion());

export const FadeSnappy = createPresenceComponent(
  createFadeMotion({ enterDuration: durationFast, exitDuration: durationFast }),
);

export const FadeExaggerated = createPresenceComponent(
  createFadeMotion({ enterDuration: durationGentle, exitDuration: durationGentle }),
);
