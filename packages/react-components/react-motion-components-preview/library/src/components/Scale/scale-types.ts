import type { PresenceDuration, PresenceEasing, AnimateOpacity } from '../../types';

export type ScaleParams = PresenceDuration &
  PresenceEasing &
  AnimateOpacity & {
    /** The scale value to animate from. Defaults to `0.9`. */
    fromScale?: number;
  };
