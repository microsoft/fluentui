import type { BasePresenceParams } from '../../types';
import type { FadePose } from '../../atoms/fade-atom';

export type FadeParams = BasePresenceParams & {
  /** Opacity before entering, or the playback source on `.In`/`.Out`. Defaults to 0 on the root and `.In`, or 1 on `.Out`. */
  fromOpacity?: FadePose;

  /** Opacity while present. Defaults to 1. Only used by the presence component. */
  inOpacity?: FadePose;

  /** Opacity after exiting, or the playback destination on `.In`/`.Out`. Defaults to `fromOpacity` on the root, 1 on `.In`, or 0 on `.Out`. */
  toOpacity?: FadePose;
};
