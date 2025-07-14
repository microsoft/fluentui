import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
  AtomMotion,
} from '@fluentui/react-motion';
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
  sizeDuration = motionTokens.durationNormal,
  opacityDuration = sizeDuration, // in sync with size duration by default
  easing = motionTokens.curveEasyEaseMax,
  delay = 0,
  exitSizeDuration = sizeDuration,
  exitOpacityDuration = opacityDuration,
  exitEasing = easing,
  exitDelay = 0,
  animateOpacity = true,
  orientation = 'vertical',
}) => {
  // ----- ENTER -----
  // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
  const enterAtoms: AtomMotion[] = [
    sizeEnterAtom({ orientation, duration: sizeDuration, easing, element }),
    whitespaceAtom({ direction: 'enter', orientation, duration: sizeDuration, easing }),
  ];
  // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    enterAtoms.push({
      ...fadeAtom({ direction: 'enter', duration: opacityDuration, easing }),
      delay: delay,
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

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapsePresenceFn);

export const CollapseSnappy = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationFast,
});

export const CollapseRelaxed = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlower,
});

/** A React component that applies collapse/expand transitions with staggered timing to its children. */
export const CollapseDelayed = createPresenceComponentVariant(createPresenceComponent(collapseDelayedPresenceFn), {
  sizeDuration: motionTokens.durationNormal,
  opacityDuration: motionTokens.durationSlower,
  easing: motionTokens.curveEasyEase,
  delay: motionTokens.durationNormal,
  exitDelay: motionTokens.durationSlower,
});
