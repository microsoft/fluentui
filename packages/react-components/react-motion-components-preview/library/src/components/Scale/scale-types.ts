import type { BasePresenceParams, AnimateOpacity } from '../../types';
import type { ScalePose } from '../../atoms/scale-atom';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale before entering, or the playback source on `.In`/`.Out`. Defaults to `0.9` for enter. */
    fromScale?: ScalePose;

    /** Scale while present. Defaults to `1`. Only used by the presence component. */
    inScale?: ScalePose;

    /** Scale after exiting, or the playback destination on `.In`/`.Out`. Presence defaults to `fromScale`. */
    toScale?: ScalePose;
  };
