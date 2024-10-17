import { motionTokens, createPresenceComponent, AtomMotion } from '@fluentui/react-motion';
import type { PresenceMotionFnCreator } from '../../types';

type CollapseOrientation = 'horizontal' | 'vertical';

const sizeValuesForOrientation = (orientation: CollapseOrientation, element: Element) => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
  const toSize = `${measuredSize}px`;
  return { sizeName, overflowName, toSize };
};

const sizeEnterAtom = ({
  orientation,
  duration,
  easing,
  element,
  fromSize = '0',
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  element: HTMLElement;
  fromSize?: string;
}): AtomMotion => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);

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
  orientation,
  duration,
  easing,
  element,
  delay = 0,
  fromSize = '0',
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  element: HTMLElement;
  delay?: number;
  fromSize?: string;
}): AtomMotion => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);

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

const whitespaceValuesForOrientation = (orientation: CollapseOrientation) => {
  const paddingStart = orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop';
  const paddingEnd = orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom';
  return { paddingStart, paddingEnd };
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
  const { paddingStart, paddingEnd } = whitespaceValuesForOrientation(orientation);
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
  const { paddingStart, paddingEnd } = whitespaceValuesForOrientation(orientation);
  return {
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', offset: 1 }],
    duration,
    easing,
    fill: 'forwards',
    delay,
  };
};

const opacityEnterAtom = ({
  duration,
  easing,
  delay = 0,
  fromOpacity = 0,
  toOpacity = 1,
}: {
  duration: number;
  easing: string;
  delay?: number;
  fromOpacity?: number;
  toOpacity?: number;
}): AtomMotion => ({
  keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
  duration,
  easing,
  delay,
  fill: 'both',
});

const opacityExitAtom = ({
  duration,
  easing,
  fromOpacity = 0,
  toOpacity = 1,
}: {
  duration: number;
  easing: string;
  fromOpacity?: number;
  toOpacity?: number;
}): AtomMotion => ({
  keyframes: [{ opacity: toOpacity }, { opacity: fromOpacity }],
  duration,
  easing,
});

// TODO: reduce duplication between CollapseDelayedVariantParams and CollapseVariantParams
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

type CollapseRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;
};

/** Define a presence motion for collapse/expand that can stagger the size and opacity motions by a given delay. */
export const createCollapseDelayedPresence: PresenceMotionFnCreator<
  CollapseDelayedVariantParams,
  CollapseRuntimeParams
> =
  ({
    // enter
    enterSizeDuration = motionTokens.durationNormal,
    enterOpacityDuration = enterSizeDuration, // in sync with size duration by default
    enterEasing = motionTokens.curveEasyEaseMax,
    enterDelay = 0,

    // exit: durations and easing default to enter values for symmetry
    exitSizeDuration = enterSizeDuration,
    exitOpacityDuration = enterOpacityDuration,
    exitEasing = enterEasing,
    exitDelay = 0,
  } = {}) =>
  ({ element, animateOpacity = true, orientation = 'vertical' }) => {
    // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
    const enterAtoms: AtomMotion[] = [
      sizeEnterAtom({
        orientation,
        duration: enterSizeDuration,
        easing: enterEasing,
        element,
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
          duration: exitOpacityDuration,
          easing: exitEasing,
        }),
      );
    }
    exitAtoms.push(
      sizeExitAtom({
        orientation,
        duration: exitSizeDuration,
        easing: exitEasing,
        element,
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

/** Define a presence motion for collapse/expand */
export const createCollapsePresence: PresenceMotionFnCreator<CollapseVariantParams, CollapseRuntimeParams> = ({
  enterDuration = motionTokens.durationNormal,
  enterEasing = motionTokens.curveEasyEaseMax,
  exitDuration = enterDuration,
  exitEasing = enterEasing,
} = {}) =>
  // Implement a regular collapse as a special case of the delayed collapse,
  // where the delays are zero, and the size and opacity durations are equal.
  createCollapseDelayedPresence({
    enterSizeDuration: enterDuration,
    enterEasing,
    exitSizeDuration: exitDuration,
    exitEasing,
  });

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
