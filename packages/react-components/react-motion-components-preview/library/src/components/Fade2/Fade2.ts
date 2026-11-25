import type { AtomMotionFn, PresenceMotionFn } from '@fluentui/react-motion';
import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom2 } from '../../atoms/fade-atom2';
import type { Fade2Params } from './fade2-types';

const fade2InMotionFn: AtomMotionFn<Fade2Params> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  fromOpacity = 0,
  restOpacity = 1,
}) =>
  fadeAtom2({
    duration,
    easing,
    delay,
    fill: 'both',
    fromOpacity,
    toOpacity: restOpacity,
  });

const fade2OutMotionFn: AtomMotionFn<Fade2Params> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  restOpacity = 1,
  toOpacity = 0,
}) =>
  fadeAtom2({
    duration,
    easing,
    delay,
    fill: 'both',
    fromOpacity: restOpacity,
    toOpacity,
  });

/** Defines a presence motion as `from → rest → to`. */
const fade2PresenceFn: PresenceMotionFn<Fade2Params> = ({
  element,
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveEasyEase,
  delay = 0,
  exitDuration = duration,
  exitEasing = easing,
  exitDelay = delay,
  fromOpacity = 0,
  restOpacity = 1,
  toOpacity = fromOpacity,
}) => ({
  enter: fade2InMotionFn({
    element,
    duration,
    easing,
    delay,
    fromOpacity,
    restOpacity,
  }),
  exit: fade2OutMotionFn({
    element,
    duration: exitDuration,
    easing: exitEasing,
    delay: exitDelay,
    restOpacity,
    toOpacity,
  }),
});

/**
 * A prototype presence component that follows `from → rest → to` opacity states.
 * `Fade2.In` performs `from → rest`; `Fade2.Out` performs `rest → to`.
 */
export const Fade2 = createPresenceComponent(fade2PresenceFn);
