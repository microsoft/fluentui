import {
  motionTokens,
  type PresenceMotionFn,
  createPresenceComponent,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';

/** Define a presence motion for collapse/expand */
const collapseMotion: PresenceMotionFn<{ animateOpacity?: boolean }> = ({ element, animateOpacity = true }) => {
  const fromOpacity = animateOpacity ? 0 : 1;
  const toOpacity = 1;
  const fromHeight = '0'; // Could be a custom param in the future: start partially expanded
  const toHeight = `${element.scrollHeight}px`;
  const overflow = 'hidden';

  const duration = motionTokens.durationNormal;
  const easing = motionTokens.curveEasyEaseMax;

  const enterKeyframes = [
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
    // Transition to the height of the content, at 99.99% of the duration.
    { opacity: toOpacity, maxHeight: toHeight, offset: 0.9999, overflow },
    // On completion, remove the maxHeight because the content might need to expand later.
    // This extra keyframe is simpler than firing a callback on completion.
    { opacity: toOpacity, maxHeight: 'unset', overflow },
  ];

  const exitKeyframes = [
    { opacity: toOpacity, maxHeight: toHeight, overflow },
    { opacity: fromOpacity, maxHeight: fromHeight, overflow },
  ];

  return {
    enter: { duration, easing, keyframes: enterKeyframes },
    exit: { duration, easing, keyframes: exitKeyframes },
  };
};

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapseMotion);

export const CollapseSnappy = createPresenceComponentVariant(Collapse, {
  all: { duration: motionTokens.durationUltraFast },
});

export const CollapseExaggerated = createPresenceComponentVariant(Collapse, {
  enter: { duration: motionTokens.durationSlow, easing: motionTokens.curveEasyEaseMax },
  exit: { duration: motionTokens.durationNormal, easing: motionTokens.curveEasyEaseMax },
});
