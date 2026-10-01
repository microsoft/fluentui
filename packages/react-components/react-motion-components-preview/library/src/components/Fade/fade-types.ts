import type { BasePresenceParams } from '../../types';
import type { FadePose } from '../../atoms/fade-atom';

export type FadeParams = BasePresenceParams & {
  /** Opacity for the out state (exited). Defaults to 0. */
  outOpacity?: FadePose;

  /** Opacity for the in state (entered). Defaults to 1. */
  inOpacity?: FadePose;
};
