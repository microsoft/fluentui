import { PresenceMotionFn, createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';
import { PresenceOverrideFields, PresenceTransitionProps } from '../../../types';

const duration = motionTokens.durationSlow;

// There may be Collapse-specific parameters in the future, e.g. for partial collapse
type CollapseParams = PresenceOverrideFields;

export const defaults: Required<PresenceTransitionProps<CollapseParams>> = {
  enter: { duration, easing: motionTokens.curveDecelerateMin },
  exit: { duration, easing: motionTokens.curveAccelerateMin },
} as const;

// Define a presence motion (enter/exit transitions) for scale in/out
const scaleMotion: PresenceMotionFn<CollapseParams> = ({
  element,
  enter: enterOverride,
  exit: exitOverride,
  animateOpacity = true,
}) => {
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
    enter: { ...defaults.enter, ...enterOverride, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exitOverride, keyframes: exitKeyframes },
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scaleMotion);
