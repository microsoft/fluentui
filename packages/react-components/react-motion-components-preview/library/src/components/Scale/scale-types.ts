import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** The scale value to animate from. Defaults to `0.9`. */
    fromScale?: number;
  };
