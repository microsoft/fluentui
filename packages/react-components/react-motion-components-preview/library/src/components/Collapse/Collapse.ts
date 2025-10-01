import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
  AtomMotion,
} from '@fluentui/react-motion';
import type { CollapseParams, CollapseOrientation } from './collapse-types';
import { sizeEnterAtom, sizeExitAtom, whitespaceAtom } from './collapse-atoms';
import { fadeAtom } from '../../atoms/fade-atom';

/** Internal helper to create collapse atoms with shared logic */
function createCollapseAtoms({
  element,
  orientation,
  animateOpacity,
  fromSize,

  // Enter params
  sizeDuration,
  opacityDuration = sizeDuration,
  easing,
  delay = 0,
  opacityDelay = 0,

  // Exit params
  exitSizeDuration,
  exitOpacityDuration = exitSizeDuration,
  exitEasing,
  exitDelay = 0,
  exitOpacityDelay = 0,
}: {
  element: HTMLElement;
  orientation: CollapseOrientation;
  animateOpacity: boolean;
  fromSize: string;
  sizeDuration: number;
  opacityDuration?: number;
  easing: string;
  delay?: number;
  opacityDelay?: number;
  exitSizeDuration: number;
  exitOpacityDuration?: number;
  exitEasing: string;
  exitDelay?: number;
  exitOpacityDelay?: number;
}) {
  // ----- ENTER -----
  // The enter transition is an array of up to 3 motion atoms: size, whitespace and opacity.
  // For enter: size expands first, then opacity fades in after opacityDelay
  const enterAtoms: AtomMotion[] = [
    {
      ...sizeEnterAtom({ orientation, duration: sizeDuration, easing, element, fromSize }),
      delay, // Apply global delay to size atom - size expansion starts first
    },
    whitespaceAtom({ direction: 'enter', orientation, duration: sizeDuration, easing, delay }),
  ];
  // Fade in only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: opacityDuration, easing, delay: delay + opacityDelay }));
  }

  // ----- EXIT -----
  // The exit transition is an array of up to 3 motion atoms: opacity, size and whitespace.
  // For exit: opacity fades out first, then size collapses after exitOpacityDelay
  const exitAtoms: AtomMotion[] = [];
  // Fade out only if animateOpacity is true. Otherwise, leave opacity unaffected.
  if (animateOpacity) {
    exitAtoms.push(
      fadeAtom({ direction: 'exit', duration: exitOpacityDuration, easing: exitEasing, delay: exitDelay }),
    );
  }

  exitAtoms.push(
    sizeExitAtom({
      orientation,
      duration: exitSizeDuration,
      easing: exitEasing,
      element,
      delay: exitDelay + exitOpacityDelay,
      fromSize,
    }),
    whitespaceAtom({
      direction: 'exit',
      orientation,
      duration: exitSizeDuration,
      easing: exitEasing,
      delay: exitDelay + exitOpacityDelay, // Size/whitespace collapse after opacity finishes fading out
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
 * @param delay - Time (ms) to delay the entire enter transition. Defaults to 0
 * @param exitDuration - Time (ms) for the exit transition (collapse). Defaults to the `duration` param for symmetry
 * @param exitEasing - Easing curve for the exit transition. Defaults to the `easing` param for symmetry
 * @param exitDelay - Time (ms) to delay the entire exit transition. Defaults to the `delay` param for symmetry
 * @param opacityDelay - Time (ms) to delay the opacity fade-in relative to the size expand start. Defaults to 0
 * @param exitOpacityDelay - Time (ms) to delay the opacity fade-out relative to the size collapse start. Defaults to the `opacityDelay` param for symmetry
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`
 * @param orientation - The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height
 * @param fromSize - The starting size for the expand animation. Defaults to `'0px'`
 */
const collapsePresenceFn: PresenceMotionFn<CollapseParams> = ({
  element,
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEaseMax,
  delay = 0,
  exitDuration = duration,
  exitEasing = easing,
  exitDelay = delay,
  opacityDelay = 0,
  exitOpacityDelay = opacityDelay,
  animateOpacity = true,
  orientation = 'vertical',
  fromSize = '0px',
}) => {
  return createCollapseAtoms({
    element,
    orientation,
    animateOpacity,
    sizeDuration: duration,
    opacityDuration: duration,
    easing,
    delay,
    opacityDelay,
    exitSizeDuration: exitDuration,
    exitOpacityDuration: exitDuration,
    exitEasing,
    exitDelay,
    exitOpacityDelay,
    fromSize,
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
export const CollapseDelayed = createPresenceComponentVariant(Collapse, {
  opacityDelay: motionTokens.durationNormal,
  exitOpacityDelay: motionTokens.durationNormal,
});
