import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** The radius of pixels to blend into the blur. A length string, defaulting to '20px'. */
    fromRadius?: string;
  };
