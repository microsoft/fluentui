import type { AtomMotion, AtomMotionFn, PresenceMotionFn } from '@fluentui/react-motion';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom2 } from '../../atoms/fade-atom2';
import { slideAtom2 } from '../../atoms/slide-atom2';
import type { Slide2Params } from './slide2-types';

const slide2InMotionFn: AtomMotionFn<Slide2Params> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  delay = 0,
  fromX = '0px',
  fromY = '0px',
  restX = '0px',
  restY = '0px',
  animateOpacity = true,
}) => {
  const atoms: AtomMotion[] = [
    slideAtom2({
      duration,
      easing,
      delay,
      fill: 'both',
      fromX,
      fromY,
      toX: restX,
      toY: restY,
    }),
  ];

  if (animateOpacity) {
    atoms.push(fadeAtom2({ duration, easing, delay, fill: 'both' }));
  }

  return atoms;
};

const slide2OutMotionFn: AtomMotionFn<Slide2Params> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveAccelerateMid,
  delay = 0,
  restX = '0px',
  restY = '0px',
  toX = '0px',
  toY = '0px',
  animateOpacity = true,
}) => {
  const atoms: AtomMotion[] = [
    slideAtom2({
      duration,
      easing,
      delay,
      fill: 'both',
      fromX: restX,
      fromY: restY,
      toX,
      toY,
    }),
  ];

  if (animateOpacity) {
    atoms.push(
      fadeAtom2({
        duration,
        easing,
        delay,
        fill: 'both',
        fromOpacity: 1,
        toOpacity: 0,
      }),
    );
  }

  return atoms;
};

/** Defines a presence motion as `from → rest → to`. */
const slide2PresenceFn: PresenceMotionFn<Slide2Params> = ({
  element,
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMid,
  exitDelay = delay,
  fromX = '0px',
  fromY = '0px',
  restX = '0px',
  restY = '0px',
  toX = fromX,
  toY = fromY,
  animateOpacity = true,
}) => ({
  enter: slide2InMotionFn({
    element,
    duration,
    easing,
    delay,
    fromX,
    fromY,
    restX,
    restY,
    animateOpacity,
  }),
  exit: slide2OutMotionFn({
    element,
    duration: exitDuration,
    easing: exitEasing,
    delay: exitDelay,
    restX,
    restY,
    toX,
    toY,
    animateOpacity,
  }),
});

/**
 * A prototype presence component that follows `from → rest → to`.
 * `Slide2.In` performs `from → rest`; `Slide2.Out` performs `rest → to`.
 */
export const Slide2 = createPresenceComponent(slide2PresenceFn);
