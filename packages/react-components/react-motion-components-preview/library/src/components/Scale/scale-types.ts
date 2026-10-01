import type { BasePresenceParams, AnimateOpacity } from '../../types';
import type { ScalePose } from '../../atoms/scale-atom';

export type ScaleParams = BasePresenceParams &
  AnimateOpacity & {
    /** Scale for the out pose. Defaults to `0.9`. */
    outScale?: ScalePose;

    /** Scale for the in pose. Defaults to `1`. */
    inScale?: ScalePose;
  };
