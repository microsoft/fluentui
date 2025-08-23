import type { PresenceDuration, PresenceEasing, PresenceDelay, AnimateOpacity } from '../../types';

export type ScaleParams = PresenceDuration &
  PresenceEasing &
  PresenceDelay &
  AnimateOpacity & {
    /** The scale value to animate from. Defaults to `0.9`. */
    fromScale?: number;
  };
