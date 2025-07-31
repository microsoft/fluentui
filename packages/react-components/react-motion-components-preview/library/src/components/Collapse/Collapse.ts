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
    enterAtoms.push({
      ...fadeAtom({ direction: 'enter', duration: opacityDuration, easing }),
      delay,
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
}

/**
 * Define a presence motion for collapse/expand
 *
 * @param element - The element to apply the collapse motion to
 * @param duration - Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms)
 * @param easing - Easing curve for the enter transition. Defaults to the `curveEasyEaseMax` value
 * @param exitDuration - Time (ms) for the exit transition (collapse). Defaults to the `duration` param for symmetry
 * @param exitEasing - Easing curve for the exit transition. Defaults to the `easing` param for symmetry
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`
 * @param orientation - The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height
 */
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

/**
 * Define a presence motion for collapse/expand that can stagger the size and opacity motions by a given delay
 *
 * @param element - The element to apply the collapse motion to
 * @param sizeDuration - Time (ms) for the size expand. Defaults to the `durationNormal` value (200 ms)
 * @param opacityDuration - Time (ms) for the fade-in. Defaults to the `durationSlower` value (400 ms)
 * @param easing - Easing curve for the enter transition. Defaults to the `curveEasyEase` value
 * @param delay - Time (ms) between the size expand start and the fade-in start. Defaults to the `durationNormal` value (200 ms)
 * @param exitSizeDuration - Time (ms) for the size collapse. Defaults to the `sizeDuration` param for temporal symmetry
 * @param exitOpacityDuration - Time (ms) for the fade-out. Defaults to the `opacityDuration` param for temporal symmetry
 * @param exitEasing - Easing curve for the exit transition. Defaults to the `easing` param for symmetry
 * @param exitDelay - Time (ms) between the fade-out start and the size collapse start. Defaults to the `durationSlower` value (400 ms)
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`
 * @param orientation - The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height
 */
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
