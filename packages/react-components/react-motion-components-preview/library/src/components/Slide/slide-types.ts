import type { BasePresenceParams, AnimateOpacity } from '../../types';

export type SlideParams = BasePresenceParams &
  AnimateOpacity & {
    /** X translate before entering, or the playback source on `.In`/`.Out`. Defaults to `'0px'`. */
    fromX?: string;

    /** Y translate before entering, or the playback source on `.In`/`.Out`. Defaults to `'0px'`. */
    fromY?: string;

    /** X translate while present. Defaults to `'0px'`. Only used by the presence component. */
    inX?: string;

    /** Y translate while present. Defaults to `'0px'`. Only used by the presence component. */
    inY?: string;

    /** X translate after exiting, or the playback destination on `.In`/`.Out`. Presence mirrors `fromX` if neither destination axis is authored; otherwise defaults to `'0px'`. Directional playback defaults to `'0px'`. */
    toX?: string;

    /** Y translate after exiting, or the playback destination on `.In`/`.Out`. Presence mirrors `fromY` if neither destination axis is authored; otherwise defaults to `'0px'`. Directional playback defaults to `'0px'`. */
    toY?: string;
  };
