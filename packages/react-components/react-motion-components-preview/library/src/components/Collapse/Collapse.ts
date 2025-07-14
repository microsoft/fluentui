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
  delay = 0,

  // Exit params
  exitSizeDuration,
  exitOpacityDuration = exitSizeDuration,
  exitEasing,
  exitDelay = 0,
}: {
  element: HTMLElement;
  orientation: 'horizontal' | 'vertical';
  animateOpacity: boolean;
  sizeDuration: number;
  opacityDuration?: number;
  easing: string;
  delay?: number;
  exitSizeDuration: number;
  exitOpacityDuration?: number;
  exitEasing: string;
  exitDelay?: number;
}) {
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
        delay: delay,
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

  const sizeExitConfig = { orientation, duration: exitSizeDuration, easing: exitEasing, element };
  const whitespaceExitConfig = {
    direction: 'exit' as const,
    orientation,
    duration: exitSizeDuration,
    easing: exitEasing,
  };

  if (exitDelay > 0) {
    exitAtoms.push(
      { ...sizeExitAtom(sizeExitConfig), delay: exitDelay },
      { ...whitespaceAtom(whitespaceExitConfig), delay: exitDelay },
    );
  } else {
    exitAtoms.push(sizeExitAtom(sizeExitConfig), whitespaceAtom(whitespaceExitConfig));
  }

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
  });
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
  return createCollapseAtoms({
    element,
    orientation,
    animateOpacity,
    sizeDuration,
    opacityDuration,
    easing,
    delay: delay,
    exitSizeDuration,
    exitOpacityDuration,
    exitEasing,
    exitDelay: exitDelay,
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

/** A React component that applies collapse/expand transitions with staggered timing to its children. */
export const CollapseDelayed = createPresenceComponentVariant(createPresenceComponent(collapseDelayedPresenceFn), {
  sizeDuration: motionTokens.durationNormal,
  opacityDuration: motionTokens.durationSlower,
  easing: motionTokens.curveEasyEase,
  delay: motionTokens.durationNormal,
  exitDelay: motionTokens.durationSlower,
});
