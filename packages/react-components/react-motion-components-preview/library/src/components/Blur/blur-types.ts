import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** Blur radius before entry. Used by Blur and Blur.In. Defaults to '10px'. */
    fromRadius?: string;

    /** Blur radius while visible. Used by Blur, Blur.In, and Blur.Out. Defaults to '0px'. */
    restRadius?: string;

    /** Blur radius after exit. Used by Blur and Blur.Out. Defaults to `fromRadius`. */
    toRadius?: string;
  };
