import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type SlideParams = BasePresenceParams &
  AnimateOpacity & {
    /** The X translate value with units to animate from. Defaults to `'0px'`. */
    fromX?: string;

    /** The Y translate value with units to animate from. Defaults to `'20px'`. */
    fromY?: string;
  };
