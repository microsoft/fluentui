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

    /** The starting size for the expand animation. Defaults to `'0px'`. */
    fromSize?: string;

    /** Time (ms) to delay the opacity fade-in relative to the size expand start. Defaults to 0. */
    opacityDelay?: number;

    /** Time (ms) to delay the opacity fade-out relative to the size collapse start. Defaults to the `opacityDelay` param for symmetry. */
    exitOpacityDelay?: number;
  };

/**
 * Internal parameters for the createCollapseAtoms function.
 * Contains all the resolved duration and timing parameters.
 */
export type CollapseAtomsParams = {
  element: HTMLElement;
  orientation: CollapseOrientation;
  fromSize: string;

  // Required resolved durations (no longer optional)
  sizeDuration: number;
  exitSizeDuration: number;

  // Timing and easing (from BasePresenceParams)
  easing: string;
  exitEasing: string;
} & Pick<BasePresenceParams, 'delay' | 'exitDelay'> &
  Pick<AnimateOpacity, 'animateOpacity'> &
  Pick<CollapseDurations, 'opacityDuration' | 'exitOpacityDuration'> &
  Pick<CollapseParams, 'opacityDelay' | 'exitOpacityDelay'>;
