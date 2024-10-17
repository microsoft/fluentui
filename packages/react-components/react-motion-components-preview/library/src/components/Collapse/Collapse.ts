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

    // Because a height of zero does not eliminate padding,
    // we will create keyframes to animate it to zero.
    // TODO: consider collapsing margin, perhaps as an option.
    const collapsedWhiteSpace = {} as { [key: string]: string };
    if (orientation === 'horizontal') {
      collapsedWhiteSpace.paddingLeft = '0';
      collapsedWhiteSpace.paddingRight = '0';
    } else {
      collapsedWhiteSpace.paddingTop = '0';
      collapsedWhiteSpace.paddingBottom = '0';
    }

    // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
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
      // Expand whitespace (padding currently).
      {
        // Animate from zero values to the element's natural values (i.e. the missing other keyframe).
        keyframes: [{ ...collapsedWhiteSpace, offset: 0 }],
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

    // The exit transition is an array of up to 3 motion atoms: opacity, size and whitespace.
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
    exitAtoms.push(
      // Collapse whitespace (padding currently).
      {
        // Animate from the element's natural values (i.e. the missing other keyframe) to zero values.
        keyframes: [{ ...collapsedWhiteSpace, offset: 1 }],
        duration: exitDuration,
        easing: exitEasing,
        fill: 'forwards',
      },
    );

    return {
      enter: enterAtoms,
      exit: exitAtoms,
    };
  };

type CollapseDelayedVariantParams = {
  /** Time (ms) for the size expand. Defaults to the durationNormal value (200 ms). */
  enterSizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the enterSizeDuration param, to sync fade-in with expand. */
  enterOpacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the enterSizeDuration param, for temporal symmetry.. */
  exitSizeDuration?: number;

  /** Defaults to the exitSizeDuration param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;

  /** Time (ms) between the size expand start and the fade-in start. Defaults to `0`.  */
  enterDelay?: number;

  /** Time (ms) between the fade-out start and the size collapse start. Defaults to `0`.  */
  exitDelay?: number;

  /** Easing curve for the enter transition, shared by size and opacity. Defaults to the easeEaseMax value.  */
  enterEasing?: string;

  /** Easing curve for the exit transition, shared by size and opacity. Defaults to the enterEasing param. */
  exitEasing?: string;
};

const sizeEnterAtom = ({
  fromSize,
  toSize,
  orientation,
  duration,
  easing,
}: {
  fromSize: string;
  toSize: string;
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
}): AtomMotion => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  return {
    keyframes: [
      { [sizeName]: fromSize, [overflowName]: 'hidden' },
      { [sizeName]: toSize, offset: 0.9999, [overflowName]: 'hidden' },
      { [sizeName]: 'unset', [overflowName]: 'unset' },
    ],
    duration,
    easing,
  };
};

const sizeExitAtom = ({
  fromSize,
  toSize,
  orientation,
  duration,
  easing,
  delay = 0,
}: {
  fromSize: string;
  toSize: string;
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  delay?: number;
}): AtomMotion => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  return {
    keyframes: [
      { [sizeName]: toSize, [overflowName]: 'hidden' },
      { [sizeName]: fromSize, [overflowName]: 'hidden' },
    ],
    duration,
    easing,
    fill: 'both',
    delay,
  };
};

// Because a height of zero does not eliminate padding,
// we will create keyframes to animate it to zero.
// TODO: consider collapsing margin, perhaps as an option.

const whitespaceEnterAtom = ({
  orientation,
  duration,
  easing,
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
}): AtomMotion => {
  const paddingStart = orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop';
  const paddingEnd = orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom';
  return {
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', offset: 0 }],
    duration,
    easing,
  };
};

const whitespaceExitAtom = ({
  orientation,
  duration,
  easing,
  delay = 0,
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  delay?: number;
}): AtomMotion => {
  const paddingStart = orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop';
  const paddingEnd = orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom';
  return {
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', offset: 1 }],
    duration,
    easing,
    fill: 'forwards',
    delay,
  };
};

const opacityEnterAtom = ({
  fromOpacity,
  toOpacity,
  duration,
  easing,
  delay = 0,
}: {
  fromOpacity: number;
  toOpacity: number;
  duration: number;
  easing: string;
  delay?: number;
}): AtomMotion => ({
  keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
  duration,
  easing,
  fill: 'both',
  delay,
});

const opacityExitAtom = ({
  fromOpacity,
  toOpacity,
  duration,
  easing,
}: {
  fromOpacity: number;
  toOpacity: number;
  duration: number;
  easing: string;
}): AtomMotion => ({
  keyframes: [{ opacity: toOpacity }, { opacity: fromOpacity }],
  duration,
  easing,
});

/** Define a presence motion for collapse/expand */
export const createCollapseDelayedPresence: PresenceMotionFnCreator<
  CollapseDelayedVariantParams,
  CollapseRuntimeParams
> =
  ({
    // enter
    enterSizeDuration = motionTokens.durationNormal,
    enterOpacityDuration = enterSizeDuration,
    enterEasing = motionTokens.curveEasyEaseMax,
    enterDelay = 0,

    // exit
    exitSizeDuration = enterSizeDuration,
    exitOpacityDuration = enterOpacityDuration,
    exitEasing = enterEasing,
    exitDelay = 0,
  } = {}) =>
  ({ element, animateOpacity = true, orientation = 'vertical' }) => {
    const fromOpacity = 0;
    const toOpacity = 1;
    const fromSize = '0'; // Could be a custom param in the future to start with partially expanded width or height
    const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
    const toSize = `${measuredSize}px`;

    // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
    const enterAtoms: AtomMotion[] = [
      sizeEnterAtom({
        fromSize,
        toSize,
        orientation,
        duration: enterSizeDuration,
        easing: enterEasing,
      }),
      whitespaceEnterAtom({
        orientation,
        duration: enterSizeDuration,
        easing: enterEasing,
      }),
    ];
    // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      enterAtoms.push(
        opacityEnterAtom({
          fromOpacity,
          toOpacity,
          duration: enterOpacityDuration,
          easing: enterEasing,
          delay: enterDelay,
        }),
      );
    }

    // The exit transition is an array of up to 3 motion atoms: opacity, size and whitespace.
    const exitAtoms: AtomMotion[] = [];
    // Fade out only if animateOpacity is true. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      exitAtoms.push(
        opacityExitAtom({
          fromOpacity,
          toOpacity,
          duration: exitOpacityDuration,
          easing: exitEasing,
        }),
      );
    }
    exitAtoms.push(
      sizeExitAtom({
        fromSize,
        toSize,
        orientation,
        duration: exitSizeDuration,
        easing: exitEasing,
        delay: exitDelay,
      }),
    );
    exitAtoms.push(
      whitespaceExitAtom({
        orientation,
        duration: exitSizeDuration,
        easing: exitEasing,
        delay: exitDelay,
      }),
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

export const CollapseDelayed = createPresenceComponent(
  createCollapseDelayedPresence({
    enterSizeDuration: motionTokens.durationNormal,
    enterOpacityDuration: motionTokens.durationSlower,
    enterDelay: motionTokens.durationNormal,
    exitDelay: motionTokens.durationSlower,
    enterEasing: motionTokens.curveEasyEase,
  }),
);
