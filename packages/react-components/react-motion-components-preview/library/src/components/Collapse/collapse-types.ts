import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type CollapseOrientation = 'horizontal' | 'vertical';

/**
 * Duration properties for granular timing control in Collapse animations.
 */
export type CollapseDurations = {
  /** Time (ms) for the size animation during enter. Defaults to `duration` for unified timing. */
  sizeDuration?: number;

  /** Time (ms) for the opacity animation during enter. Defaults to `sizeDuration` for synchronized timing. */
  opacityDuration?: number;

  /** Time (ms) for the size animation during exit. Defaults to `exitDuration` for unified timing. */
  exitSizeDuration?: number;

  /** Time (ms) for the opacity animation during exit. Defaults to `exitSizeDuration` for synchronized timing. */
  exitOpacityDuration?: number;
};

export type CollapseParams = BasePresenceParams &
  AnimateOpacity &
  CollapseDurations & {
    /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
    orientation?: CollapseOrientation;

    /** Size for the out state (collapsed). Defaults to `'0px'`. */
    outSize?: string;

    /**
     * Time (ms) to delay the inner stagger between size and opacity animations.
     * On enter this delays the opacity after size; on exit this delays the size after opacity.
     * Defaults to 0.
     */
    staggerDelay?: number;

    /**
     * Time (ms) to delay the inner stagger during exit. Defaults to the `staggerDelay` param for symmetry.
     */
    exitStaggerDelay?: number;
  };
