import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** Blur radius in the out state (exited). Defaults to '10px'. */
    outRadius?: string;

    /** Blur radius in the in state (entered). Defaults to '0px'. */
    inRadius?: string;
  };
