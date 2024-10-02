import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import type { PresenceMotionFnCreator } from '../../types';

const { durationNormal, durationSlower, durationFast, curveEasyEaseMax } = motionTokens;

type CollapseVariantParams = {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition (expand). Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition (collapse). Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (expand). Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};

type CollapseRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

/** Define a presence motion for collapse/expand */
export const createCollapsePresence: PresenceMotionFnCreator<CollapseVariantParams, CollapseRuntimeParams> =
  ({
    enterDuration = durationNormal,
    enterEasing = curveEasyEaseMax,
    exitDuration = enterDuration,
    exitEasing = enterEasing,
  } = {}) =>
  ({ element, animateOpacity = true }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromHeight = '0'; // Could be a custom param in the future to start partially expanded
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
export const Collapse = createPresenceComponent(createCollapsePresence());

export const CollapseSnappy = createPresenceComponent(createCollapsePresence({ enterDuration: durationFast }));

export const CollapseExaggerated = createPresenceComponent(createCollapsePresence({ enterDuration: durationSlower }));
