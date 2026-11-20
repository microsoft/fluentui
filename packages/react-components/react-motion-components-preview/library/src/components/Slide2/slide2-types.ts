import type { AnimateOpacity, BasePresenceParams } from '../../types';

export type Slide2Params = BasePresenceParams &
  AnimateOpacity & {
    /** X translation from which the element enters. Used by `Slide2` and `Slide2.In`. Defaults to `'0px'`. */
    fromX?: string;

    /** Y translation from which the element enters. Used by `Slide2` and `Slide2.In`. Defaults to `'0px'`. */
    fromY?: string;

    /** X translation of the resting state. Used by all `Slide2` forms. Defaults to `'0px'`. */
    restX?: string;

    /** Y translation of the resting state. Used by all `Slide2` forms. Defaults to `'0px'`. */
    restY?: string;

    /** X translation towards which the element exits. Used by `Slide2` and `Slide2.Out`. Defaults to `fromX`. */
    toX?: string;

    /** Y translation towards which the element exits. Used by `Slide2` and `Slide2.Out`. Defaults to `fromY`. */
    toY?: string;
  };
