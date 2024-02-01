import { PresenceMotionFn, createPresence } from '@fluentui/react-motions-preview';
// TODO: set up export from @fluentui/react-motions-preview
import { easingDecelerateMid } from '../../../motions/atom/tokens';

type DurationMS = number;

type CollapseParams = {
  duration?: DurationMS;
};

const defaults: CollapseParams = {
  duration: 200,
} as const;

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn<CollapseParams> = ({ element, duration = defaults.duration }) => {
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
    enter: { duration, keyframes: enterKeyframes, easing: easingDecelerateMid },
    exit: { duration, keyframes: exitKeyframes, easing: easingDecelerateMid },
  };
};

// Create a React component that applies collapse/expand transitions to its children
export const Collapse = createPresence(collapseMotion);
