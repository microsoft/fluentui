import { PresenceMotionFn, createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import { PresenceParams, PresenceTransitionProps } from '../../../types';
// import { FadeParams } from '../../atom/fade';

const duration = motionTokens.durationNormal;
const easing = motionTokens.curveDecelerateMid;

// const enterNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
//   keyframes: [{ opacity: fromValue }, { opacity: 1 }],

//   duration: durationNormal,
//   easing: easingLinear,
// });

// const exitNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
//   keyframes: [{ opacity: 1 }, { opacity: fromValue }],

//   duration: durationNormal,
//   easing: easingLinear,
// });

export const defaults: Required<PresenceTransitionProps<PresenceParams>> = {
  enter: { duration, easing },
  exit: { duration, easing },
} as const;

const fadeMotion: PresenceMotionFn = ({ enter: enterOverride, exit: exitOverride }) => {
  // TODO: fromValue?
  const enterKeyframes = [{ opacity: 0 }, { opacity: 1 }];

  const exitKeyframes = [{ opacity: 1 }, { opacity: 0 }];

  return {
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

// Create a React component that applies fade in/out transitions to its children
export const Fade = createPresenceComponent(fadeMotion);
