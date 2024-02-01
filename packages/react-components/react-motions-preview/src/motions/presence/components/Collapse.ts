import { PresenceMotionFn, createPresence } from '@fluentui/react-motions-preview';
// TODO: set up export from @fluentui/react-motions-preview
import { easingDecelerateMid } from '../../../motions/atom/tokens';
import { PresenceParams, PresenceTransitionProps } from '../../../types';

// There may be Collapse-specific parameters in the future, e.g. for partial collapse
export type CollapseParams = PresenceParams;

export const defaults: Required<PresenceTransitionProps<PresenceParams>> = {
  enter: {
    duration: 200,
    easing: easingDecelerateMid,
  },
  exit: {
    duration: 200,
    easing: easingDecelerateMid,
  },
} as const;

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn<CollapseParams> = ({ element, enter, exit }) => {
  const enterKeyframes = [
    { opacity: 0, maxHeight: 0, overflow: 'hidden' },
    // Transition to the height of the content, at 99.99% of the duration.
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, offset: 0.9999 },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: 1, maxHeight: 'unset', overflow: 'hidden' },
  ];

  const exitKeyframes = [
    { opacity: 1, maxHeight: `${element.scrollHeight}px`, overflow: 'hidden' },
    { opacity: 0, maxHeight: 0, overflow: 'hidden' },
  ];

  return {
    enter: { ...defaults.enter, ...enter, keyframes: enterKeyframes },
    exit: { ...defaults.exit, ...exit, keyframes: exitKeyframes },
  };
};

// Create a React component that applies collapse/expand transitions to its children
export const Collapse = createPresence(collapseMotion);
