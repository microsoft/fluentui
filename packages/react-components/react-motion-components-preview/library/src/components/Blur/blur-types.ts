import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** Blur radius for the out state (exited). Defaults to '10px'. */
    outRadius?: string;

    /** Blur radius for the in state (entered). Defaults to '0px'. */
    inRadius?: string;
  };
