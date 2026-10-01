import type { BasePresenceParams } from '../../types';
import type { FadePose } from '../../atoms/fade-atom';

export type FadeParams = BasePresenceParams & {
  /** Opacity before entering, or the playback source on `.In`/`.Out`. Defaults to 0 for enter. */
  fromOpacity?: FadePose;

  /** Opacity while present. Defaults to 1. Only used by the presence component. */
  inOpacity?: FadePose;

  /** Opacity after exiting, or the playback destination on `.In`/`.Out`. Presence defaults to `fromOpacity`. */
  toOpacity?: FadePose;
};
