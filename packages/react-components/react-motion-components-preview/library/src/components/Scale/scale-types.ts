import type { BasePresenceParams, AnimateOpacity } from '../../types';
import type { ScalePose } from '../../atoms/scale-atom';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale before entering, or the playback source on `.In`/`.Out`. Defaults to `0.9` on the root and `.In`, or `1` on `.Out`. */
    fromScale?: ScalePose;

    /** Scale while present. Defaults to `1`. Only used by the presence component. */
    inScale?: ScalePose;

    /** Scale after exiting, or the playback destination on `.In`/`.Out`. Defaults to `fromScale` on the root, `1` on `.In`, or `0.9` on `.Out`. */
    toScale?: ScalePose;
  };
