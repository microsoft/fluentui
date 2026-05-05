import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type SlideParams = BasePresenceParams &
  AnimateOpacity & {
    /** X translate for the out state (exited). Defaults to `'0px'`. */
    outX?: string;

    /** Y translate for the out state (exited). Defaults to `'0px'`. */
    outY?: string;

    /** X translate for the in state (entered). Defaults to `'0px'`. */
    inX?: string;

    /** Y translate for the in state (entered). Defaults to `'0px'`. */
    inY?: string;
  };
