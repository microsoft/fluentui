import type { BasePresenceParams, AnimateOpacity } from '../../types';
import type { BlurPose } from '../../atoms/blur-atom';

export type BlurParams = BasePresenceParams &
  AnimateOpacity & {
    /** Blur before entering, or the playback source on `.In`/`.Out`. Defaults to `'10px'` on the root and `.In`, or `'0px'` on `.Out`. */
    fromRadius?: BlurPose;

    /** Blur while present. Defaults to `'0px'`. Only used by the root presence component. */
    inRadius?: BlurPose;

    /** Blur after exiting, or the playback destination on `.In`/`.Out`. Defaults to `fromRadius` on the root, `'0px'` on `.In`, or `'10px'` on `.Out`. */
    toRadius?: BlurPose;
  };
