import type { PresenceDuration, PresenceEasing } from '../../types';

export type SlideParams = PresenceDuration &
  PresenceEasing & {
    /** The X translate value with units to animate from. Defaults to `'0px'`. */
    fromX?: string;

    /** The Y translate value with units to animate from. Defaults to `'20px'`. */
    fromY?: string;

    /** Whether to animate the opacity. Defaults to `true`. */
    animateOpacity?: boolean;
  };
