import type { PresenceDuration, PresenceEasing } from '../../types';

export type ScaleParams = PresenceDuration &
  PresenceEasing & {
    /** The scale value to animate from. Defaults to `0.9`. */
    fromScale?: number;

    /** Whether to animate the opacity. Defaults to `true`. */
    animateOpacity?: boolean;
  };
