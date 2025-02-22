import { motionTokens, createPresenceComponent, AtomMotion } from '@fluentui/react-motion';
import type { PresenceMotionFnCreator } from '../../types';
import type { CollapseDelayedVariantParams, CollapseRuntimeParams, CollapseVariantParams } from './collapse-types';
import { sizeEnterAtom, sizeExitAtom, whitespaceAtom } from './collapse-atoms';
import { fadeAtom } from '../../atoms/fade-atom';

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
    // ----- ENTER -----
    // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
    const enterAtoms: AtomMotion[] = [
      sizeEnterAtom({ orientation, duration: enterSizeDuration, easing: enterEasing, element }),
      whitespaceAtom({ direction: 'enter', orientation, duration: enterSizeDuration, easing: enterEasing }),
    ];
    // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      enterAtoms.push({
        ...fadeAtom({ direction: 'enter', duration: enterOpacityDuration, easing: enterEasing }),
        delay: enterDelay,
        fill: 'both',
      });
    }

    // ----- EXIT -----
    // The exit transition is an array of up to 3 motion atoms: opacity, size and whitespace.
    const exitAtoms: AtomMotion[] = [];
    // Fade out only if animateOpacity is true. Otherwise, leave opacity unaffected.
    if (animateOpacity) {
      exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitOpacityDuration, easing: exitEasing }));
    }
    exitAtoms.push(
      sizeExitAtom({ orientation, duration: exitSizeDuration, easing: exitEasing, element, delay: exitDelay }),
      whitespaceAtom({
        direction: 'exit',
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

/** Defines a presence motion for collapse/expand. */
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

export const CollapseRelaxed = createPresenceComponent(
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
