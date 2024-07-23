import {
  motionTokens,
  PresenceMotion,
  createPresenceComponent,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

const duration = motionTokens.durationNormal;
const easing = motionTokens.curveEasyEase;

/** Define a presence motion for fade in/out  */
const fadeMotion: PresenceMotion = {
  enter: { duration, easing, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  exit: { duration, easing, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(fadeMotion);

export const FadeSnappy = createPresenceComponentVariant(Fade, { all: { duration: motionTokens.durationFast } });

export const FadeExaggerated = createPresenceComponentVariant(Fade, { all: { duration: motionTokens.durationGentle } });
