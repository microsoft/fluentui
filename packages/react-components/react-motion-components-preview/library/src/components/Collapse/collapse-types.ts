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

    // Granular duration controls (advanced API)
    /** Time (ms) for the size animation during enter. Defaults to `duration` for unified timing. */
    sizeDuration?: number;

    /** Time (ms) for the opacity animation during enter. Defaults to `sizeDuration` for synchronized timing. */
    opacityDuration?: number;

    /** Time (ms) for the size animation during exit. Defaults to `exitDuration` for unified timing. */
    exitSizeDuration?: number;

    /** Time (ms) for the opacity animation during exit. Defaults to `exitSizeDuration` for synchronized timing. */
    exitOpacityDuration?: number;
  };
