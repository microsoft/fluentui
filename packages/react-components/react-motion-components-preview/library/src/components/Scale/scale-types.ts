import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale for the out state (exited). Defaults to `0.9`. */
    outScale?: number;

    /** Scale for the in state (entered). Defaults to `1`. */
    inScale?: number;
  };
