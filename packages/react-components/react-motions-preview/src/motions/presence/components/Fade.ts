import { PresenceMotionFn, createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import { PresenceTransitionProps } from '../../../types';

const duration = motionTokens.durationNormal;
const easing = motionTokens.curveLinear;

export const defaults: Required<PresenceTransitionProps> = {
  enter: { duration, easing },
  exit: { duration, easing },
} as const;

// Define a presence motion (enter/exit transitions) for fade in/out
const fadeMotion: PresenceMotionFn = ({ enter: enterOverride, exit: exitOverride }) => {
  const fromOpacity = 0;
  const toOpacity = 1;

  const enterKeyframes = [{ opacity: fromOpacity }, { opacity: toOpacity }];

  const exitKeyframes = [{ opacity: toOpacity }, { opacity: fromOpacity }];

  // Allow default duration and easing to be overridden
  return {
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

/** A React component that applies fade in/out transitions to its children. */
export const Fade = createPresenceComponent(fadeMotion);
