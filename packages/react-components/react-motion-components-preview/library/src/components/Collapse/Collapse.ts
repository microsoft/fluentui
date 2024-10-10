import { motionTokens, createPresenceComponent, AtomMotion } from '@fluentui/react-motion';
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
    const fromOpacity = 0;
    const toOpacity = 1;
    const fromSize = '0'; // Could be a custom param in the future to start with partially expanded width or height
    const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
    const toSize = `${measuredSize}px`;
    // use generic names for size and overflow, handling vertical or horizontal orientation
    const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
    const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';

    // The enter transition is an array of up to 2 motion atoms: size and opacity.
    const enterAtoms: AtomMotion[] = [
      // Expand size (height or width)
      {
        keyframes: [
          {
            [sizeName]: fromSize,
            [overflowName]: 'hidden',
          },
          { [sizeName]: toSize, offset: 0.9999, [overflowName]: 'hidden' },
          { [sizeName]: 'unset', [overflowName]: 'unset' },
        ],
        duration: enterDuration,
        easing: enterEasing,
      },
    ];
    // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      enterAtoms.push({
        keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
        duration: enterDuration,
        easing: enterEasing,
        fill: 'both',
      });
    }

    // The exit transition is an array of up to 2 motion atoms: opacity and size.
    const exitAtoms: AtomMotion[] = [];
    // Fade out only if animateOpacity is false. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      exitAtoms.push({
        keyframes: [{ opacity: toOpacity }, { opacity: fromOpacity }],
        duration: exitDuration,
        easing: exitEasing,
      });
    }
    exitAtoms.push(
      // Collapse size (height or width)
      {
        keyframes: [
          { [sizeName]: toSize, [overflowName]: 'hidden' },
          { [sizeName]: fromSize, [overflowName]: 'hidden' },
        ],
        duration: exitDuration,
        easing: exitEasing,
        fill: 'both',
      },
    );

    return {
      enter: enterAtoms,
      exit: exitAtoms,
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
