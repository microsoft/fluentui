import {
  motionTokens,
  type PresenceMotionFnCreator,
  createPresenceComponent,
  PresenceParams,
} from '@fluentui/react-motion';

const { durationNormal, durationUltraFast, durationSlow, curveEasyEaseMax } = motionTokens;

/** Define a presence motion for collapse/expand */
const createCollapseMotionFn: PresenceMotionFnCreator<PresenceParams, { animateOpacity?: boolean }> =
  ({
    enterDuration = durationNormal,
    exitDuration = durationNormal,
    enterEasing = curveEasyEaseMax,
    exitEasing = curveEasyEaseMax,
  } = {}) =>
  ({ element, animateOpacity = true }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromHeight = '0'; // Could be a custom param in the future, for collapsing to a specific height.
    const toHeight = `${element.scrollHeight}px`;
    const overflow = 'hidden';

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
      enter: { duration: enterDuration, easing: enterEasing, keyframes: enterKeyframes },
      exit: { duration: exitDuration, easing: exitEasing, keyframes: exitKeyframes },
    };
  };

/** A React component that applies collapse/expand transitions to its children. */
export const CollapseSemiOld = createPresenceComponent(createCollapseMotionFn());

export const CollapseSnappySemiOld = createPresenceComponent(
  createCollapseMotionFn({ enterDuration: durationUltraFast, exitDuration: durationUltraFast }),
);

export const CollapseExaggeratedSemiOld = createPresenceComponent(
  createCollapseMotionFn({ enterDuration: durationSlow, exitDuration: durationNormal }),
);
