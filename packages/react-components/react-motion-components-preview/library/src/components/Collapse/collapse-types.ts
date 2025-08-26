import type { BasePresenceParams, PresenceEasing, PresenceDelay, AnimateOpacity } from '../../types';

export type CollapseOrientation = 'horizontal' | 'vertical';

/** Common properties shared by all collapse components */
type CollapseBaseParams = PresenceEasing &
  PresenceDelay &
  AnimateOpacity & {
    /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
    orientation?: CollapseOrientation;
  };

export type CollapseParams = BasePresenceParams &
  AnimateOpacity & {
    /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
    orientation?: CollapseOrientation;
  };

export type CollapseDelayedParams = CollapseBaseParams & {
  /** Time (ms) for the size expand. Defaults to the `durationNormal` value (200 ms). */
  sizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the `sizeDuration` param, to sync fade-in with expand. */
  opacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the `sizeDuration` param, for temporal symmetry. */
  exitSizeDuration?: number;

  /** Time (ms) for the fade-out. Defaults to the `exitSizeDuration` param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;

  /** Time (ms) between the size expand start and the fade-in start. Defaults to `0`. */
  delay?: number;

  /** Time (ms) between the fade-out start and the size collapse start. Defaults to `0`. */
  exitDelay?: number;
};
