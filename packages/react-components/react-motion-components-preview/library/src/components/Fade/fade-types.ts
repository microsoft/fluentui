import type { BasePresenceParams } from '../../types';

export type FadeParams = BasePresenceParams & {
  /** Opacity in the out state (exited). Defaults to 0. */
  outOpacity?: number;

  /** Opacity in the in state (entered). Defaults to 1. */
  inOpacity?: number;
};
