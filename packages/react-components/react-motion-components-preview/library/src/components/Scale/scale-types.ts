import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale in the out state (exited). Defaults to `0.9`. */
    outScale?: number;

    /** Scale in the in state (entered). Defaults to `1`. */
    inScale?: number;
  };
