import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type SlideParams = BasePresenceParams &
  AnimateOpacity & {
    /** The X translate value with units to animate from. Defaults to `'0px'`. */
    outX?: string;

    /** The Y translate value with units to animate from. Defaults to `'20px'`. */
    outY?: string;

    /** The X translate value with units to animate to. Defaults to `'0px'`. */
    inX?: string;

    /** The Y translate value with units to animate to. Defaults to `'0px'`. */
    inY?: string;
  };
