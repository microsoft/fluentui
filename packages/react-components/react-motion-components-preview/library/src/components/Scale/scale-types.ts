import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** The scale value to animate from. Defaults to `0.9`. */
    fromScale?: number;

    /** The scale value to animate to. Defaults to `1`. */
    toScale?: number;
  };
