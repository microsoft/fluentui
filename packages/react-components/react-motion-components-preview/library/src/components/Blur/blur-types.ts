import type { PresenceDuration, PresenceEasing, AnimateOpacity } from '../../types';

export type BlurParams = PresenceDuration &
  PresenceEasing &
  AnimateOpacity & {
    /** The radius of pixels to blend into the blur. A length string, defaulting to '20px'. */
    fromRadius?: string;
  };
