import { PresenceMotionFn, createPresenceComponent, motionTokens } from '@fluentui/react-motions-preview';

const { durationNormal, curveDecelerateMid } = motionTokens;

// Define a presence motion (enter/exit transitions) for collapse/expand
const collapseMotion: PresenceMotionFn = element => {
  // TODO: make duration a parameter
  const duration = durationNormal;

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
    enter: { duration, keyframes: enterKeyframes, easing: curveDecelerateMid },
    exit: { duration, keyframes: exitKeyframes, easing: curveDecelerateMid },
  };
};

// Create a React component that applies collapse/expand transitions to its children
export const Collapse = createPresenceComponent(collapseMotion);
