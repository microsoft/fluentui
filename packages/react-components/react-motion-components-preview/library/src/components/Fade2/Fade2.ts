import type { AtomMotionFn, PresenceMotionFn } from '@fluentui/react-motion';
import { createMotionComponent, createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { fadeAtom2 } from '../../atoms/fade-atom2';
import type { Fade2Component, Fade2InParams, Fade2OutParams, Fade2Params } from './fade2-types';

const fade2InMotionFn: AtomMotionFn<Fade2InParams> = ({
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

const fade2OutMotionFn: AtomMotionFn<Fade2OutParams> = ({
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

const Fade2In = createMotionComponent(fade2InMotionFn);
const Fade2Out = createMotionComponent(fade2OutMotionFn);
const Fade2Presence = createPresenceComponent(fade2PresenceFn);

/**
 * A prototype presence component that follows `from → rest → to` opacity states.
 * `Fade2.In` performs `from → rest`; `Fade2.Out` performs `rest → to`.
 */
export const Fade2 = Object.assign(Fade2Presence, {
  In: Fade2In,
  Out: Fade2Out,
}) as Fade2Component;
