import type { BasePresenceParams } from '../../types';

export type FadeParams = BasePresenceParams & {
  /** The starting opacity value. Defaults to 0. */
  fromOpacity?: number;

  /** The ending opacity value. Defaults to 1. */
  toOpacity?: number;
};
