import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type CollapseOrientation = 'horizontal' | 'vertical';

export type CollapseParams = BasePresenceParams &
  AnimateOpacity & {
    /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
    orientation?: CollapseOrientation;

    /** The starting size for the expand animation. Defaults to `'0px'`. */
    fromSize?: string;
  };

/**
 * Collapse parameters with granular duration control.
 *
 * Omits `duration` and `exitDuration` from CollapseParams to allow independent
 * control of size and opacity animation timing for staggered effects.
 */
export type CollapseDelayedParams = Omit<CollapseParams, 'duration' | 'exitDuration'> & {
  /** Time (ms) for the size expand. Defaults to the `durationNormal` value (200 ms). */
  sizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the `sizeDuration` param, to sync fade-in with expand. */
  opacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the `sizeDuration` param, for temporal symmetry. */
  exitSizeDuration?: number;

  /** Time (ms) for the fade-out. Defaults to the `exitSizeDuration` param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;
};
