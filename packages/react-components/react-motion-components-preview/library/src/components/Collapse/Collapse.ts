import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import type { PresenceMotionFnCreator } from '../../types';

type CollapseOrientation = 'horizontal' | 'vertical';

type CollapseVariantParams = {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition (expand). Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition (collapse). Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (collapse). Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};

type CollapseRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;
};

/** Define a presence motion for collapse/expand */
export const createCollapsePresence: PresenceMotionFnCreator<CollapseVariantParams, CollapseRuntimeParams> =
  ({
    enterDuration = motionTokens.durationNormal,
    enterEasing = motionTokens.curveEasyEaseMax,
    exitDuration = enterDuration,
    exitEasing = enterEasing,
  } = {}) =>
  ({ element, animateOpacity = true, orientation = 'vertical' }) => {
    // TODO: don't change opacity at all if animateOpacity is false
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromSize = '0'; // Could be a custom param in the future to start with partially expanded width or height
    const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
    const toSize = `${measuredSize}px`;
    // use generic names for size and overflow, handling vertical or horizontal orientation
    const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
    const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';

    const enterKeyframes = [
      { opacity: fromOpacity, [sizeName]: fromSize, [overflowName]: 'hidden' },
      // Transition to the height of the content, at 99.99% of the duration.
      { opacity: toOpacity, [sizeName]: toSize, offset: 0.9999, [overflowName]: 'hidden' },
      // On completion, remove the maxHeight because the content might need to expand later.
      // This extra keyframe is simpler than firing a callback on completion.
      { opacity: toOpacity, [sizeName]: 'unset', [overflowName]: 'hidden' },
    ];

    const exitKeyframes = [
      { opacity: toOpacity, [sizeName]: toSize, [overflowName]: 'hidden' },
      { opacity: fromOpacity, [sizeName]: fromSize, [overflowName]: 'hidden' },
    ];

    return {
      enter: { duration: enterDuration, easing: enterEasing, keyframes: enterKeyframes },
      exit: { duration: exitDuration, easing: exitEasing, keyframes: exitKeyframes },
    };
  };

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(createCollapsePresence());

export const CollapseSnappy = createPresenceComponent(
  createCollapsePresence({ enterDuration: motionTokens.durationFast }),
);

export const CollapseExaggerated = createPresenceComponent(
  createCollapsePresence({ enterDuration: motionTokens.durationSlower }),
);
