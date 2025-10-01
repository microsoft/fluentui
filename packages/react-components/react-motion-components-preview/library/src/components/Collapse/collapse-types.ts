import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type CollapseOrientation = 'horizontal' | 'vertical';

export type CollapseParams = BasePresenceParams &
  AnimateOpacity & {
    /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
    orientation?: CollapseOrientation;

    /** The starting size for the expand animation. Defaults to `'0px'`. */
    fromSize?: string;

    /** Time (ms) to delay the opacity fade-in relative to the size expand start. Defaults to 0. */
    opacityDelay?: number;

    /** Time (ms) to delay the opacity fade-out relative to the size collapse start. Defaults to the `opacityDelay` param for symmetry. */
    exitOpacityDelay?: number;
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

  /** Time (ms) for the fade-in. Defaults to the `durationSlower` value (400 ms). */
  opacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the `sizeDuration` param, for temporal symmetry. */
  exitSizeDuration?: number;

  /** Time (ms) for the fade-out. Defaults to the `opacityDuration` param, for temporal symmetry. */
  exitOpacityDuration?: number;
};
