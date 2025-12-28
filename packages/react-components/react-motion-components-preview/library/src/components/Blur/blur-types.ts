import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** The blur radius with units to animate from. Defaults to '10px'. */
    fromRadius?: string;

    /** The blur radius with units to animate to. Defaults to '0px'. */
    toRadius?: string;
  };
