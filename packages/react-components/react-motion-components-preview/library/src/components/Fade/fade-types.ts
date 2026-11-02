import type { BasePresenceParams } from '../../types';

export type FadeParams = BasePresenceParams & {
  /** Opacity for the out state (exited). Defaults to 0. */
  outOpacity?: number;

  /** Opacity for the in state (entered). Defaults to 1. */
  inOpacity?: number;
};
