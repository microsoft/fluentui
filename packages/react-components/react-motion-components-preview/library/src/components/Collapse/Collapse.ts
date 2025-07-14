import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
  AtomMotion,
} from '@fluentui/react-motion';
import type { PresenceMotionFnCreator } from '../../types';
import type { CollapseDelayedParams, CollapseParams } from './collapse-types';
import { sizeEnterAtom, sizeExitAtom, whitespaceAtom } from './collapse-atoms';
import { fadeAtom } from '../../atoms/fade-atom';

/** Define a presence motion for collapse/expand */
const collapsePresenceFn: PresenceMotionFn<CollapseParams> = ({
  element,
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEaseMax,
  exitDuration = duration,
  exitEasing = easing,
  animateOpacity = true,
  orientation = 'vertical',
}) => {
  // ----- ENTER -----
  // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
  const enterAtoms: AtomMotion[] = [
    sizeEnterAtom({ orientation, duration, easing, element }),
    whitespaceAtom({ direction: 'enter', orientation, duration, easing }),
  ];
  // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing }));
  }

  // ----- EXIT -----
  // The exit transition is an array of up to 3 motion atoms: opacity, size and whitespace.
  const exitAtoms: AtomMotion[] = [];
  // Fade out only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }
  exitAtoms.push(
    sizeExitAtom({ orientation, duration: exitDuration, easing: exitEasing, element }),
    whitespaceAtom({ direction: 'exit', orientation, duration: exitDuration, easing: exitEasing }),
  );

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** Define a presence motion for collapse/expand that can stagger the size and opacity motions by a given delay */
const collapseDelayedPresenceFn: PresenceMotionFn<CollapseDelayedParams> = ({
  element,
  enterSizeDuration = motionTokens.durationNormal,
  enterOpacityDuration = enterSizeDuration, // in sync with size duration by default
  enterEasing = motionTokens.curveEasyEaseMax,
  enterDelay = 0,
  exitSizeDuration = enterSizeDuration,
  exitOpacityDuration = enterOpacityDuration,
  exitEasing = enterEasing,
  exitDelay = 0,
  animateOpacity = true,
  orientation = 'vertical',
}) => {
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

// For backward compatibility - creates a collapse presence function that works with the old pattern
export const createCollapseDelayedPresence: PresenceMotionFnCreator<
  Omit<CollapseDelayedParams, 'animateOpacity' | 'orientation'>,
  Pick<CollapseDelayedParams, 'animateOpacity' | 'orientation'>
> =
  ({
    enterSizeDuration = motionTokens.durationNormal,
    enterOpacityDuration = enterSizeDuration,
    enterEasing = motionTokens.curveEasyEaseMax,
    enterDelay = 0,
    exitSizeDuration = enterSizeDuration,
    exitOpacityDuration = enterOpacityDuration,
    exitEasing = enterEasing,
    exitDelay = 0,
  } = {}) =>
  ({ element, animateOpacity = true, orientation = 'vertical' }) => {
    // Use the new presence function with the provided parameters
    return collapseDelayedPresenceFn({
      element,
      enterSizeDuration,
      enterOpacityDuration,
      enterEasing,
      enterDelay,
      exitSizeDuration,
      exitOpacityDuration,
      exitEasing,
      exitDelay,
      animateOpacity,
      orientation,
    });
  };

// For backward compatibility - creates a collapse presence function that works with the old pattern
export const createCollapsePresence: PresenceMotionFnCreator<
  Pick<CollapseParams, 'duration' | 'easing' | 'exitDuration' | 'exitEasing'>,
  Pick<CollapseParams, 'animateOpacity' | 'orientation'>
> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEaseMax,
  exitDuration = duration,
  exitEasing = easing,
} = {}) =>
  // Implement a regular collapse as a special case of the delayed collapse,
  // where the delays are zero, and the size and opacity durations are equal.
  createCollapseDelayedPresence({
    enterSizeDuration: duration,
    enterEasing: easing,
    exitSizeDuration: exitDuration,
    exitEasing,
  });

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapsePresenceFn);

export const CollapseSnappy = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationFast,
});

export const CollapseRelaxed = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlower,
});

/** A React component that applies collapse/expand transitions with staggered timing to its children. */
export const CollapseDelayed = createPresenceComponent(collapseDelayedPresenceFn);
