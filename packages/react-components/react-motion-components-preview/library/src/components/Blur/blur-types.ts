import type { PresenceDuration, PresenceEasing } from '../../types';

export type BlurParams = PresenceDuration &
  PresenceEasing & { 
    /** The radius of pixels to blend into the blur. A length string, defaulting to '20px'. */
    fromRadius?: string;

    /** Whether to animate the opacity. Defaults to `true`. */
    animateOpacity?: boolean;
  };
