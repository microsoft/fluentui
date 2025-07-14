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

/** Internal helper to create collapse atoms with shared logic */
function createCollapseAtoms({
  element,
  orientation,
  animateOpacity,

  // Enter params
  sizeDuration,
  opacityDuration = sizeDuration,
  easing,
  delay,

  // Exit params
  exitSizeDuration,
  exitOpacityDuration = exitSizeDuration,
  exitEasing,
  exitDelay,
}: {
  element: HTMLElement;
} & Required<CollapseDelayedParams>) {
  // ----- ENTER -----
  // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
  const enterAtoms: AtomMotion[] = [
    sizeEnterAtom({ orientation, duration: sizeDuration, easing, element }),
    whitespaceAtom({ direction: 'enter', orientation, duration: sizeDuration, easing }),
  ];
  // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    const fadeEnterAtom = fadeAtom({ direction: 'enter', duration: opacityDuration, easing });
    if (delay > 0) {
      enterAtoms.push({
        ...fadeEnterAtom,
        delay,
        fill: 'both',
      });
    } else {
      enterAtoms.push(fadeEnterAtom);
    }
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
}

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
  return createCollapseAtoms({
    element,
    orientation,
    animateOpacity,
    sizeDuration: duration,
    opacityDuration: duration,
    easing,
    exitSizeDuration: exitDuration,
    exitOpacityDuration: exitDuration,
    exitEasing,
    delay: 0,
    exitDelay: 0,
  });
};

/** Define a presence motion for collapse/expand that can stagger the size and opacity motions by a given delay */
const collapseDelayedPresenceFn: PresenceMotionFn<CollapseDelayedParams> = ({
  element,
  sizeDuration = motionTokens.durationNormal,
  opacityDuration = motionTokens.durationSlower,
  easing = motionTokens.curveEasyEase,
  delay = motionTokens.durationNormal,
  exitSizeDuration = sizeDuration,
  exitOpacityDuration = opacityDuration,
  exitEasing = easing,
  exitDelay = motionTokens.durationSlower,
  animateOpacity = true,
  orientation = 'vertical',
}) => {
  return createCollapseAtoms({
    element,
    orientation,
    animateOpacity,
    sizeDuration,
    opacityDuration,
    easing,
    delay,
    exitSizeDuration,
    exitOpacityDuration,
    exitEasing,
    exitDelay,
  });
};

/** A React component that applies collapse/expand transitions to its children. */
export const Collapse = createPresenceComponent(collapsePresenceFn);

export const CollapseSnappy = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationFast,
});

export const CollapseRelaxed = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlower,
});

/** A React component that applies collapse/expand transitions with delayed fade to its children. */
export const CollapseDelayed = createPresenceComponent(collapseDelayedPresenceFn);
