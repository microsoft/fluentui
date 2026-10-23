import type { BasePresenceParams } from '../../types';

export type Fade2Params = BasePresenceParams & {
  /** Opacity from which the element enters. Used by `Fade2` and `Fade2.In`. Defaults to 0. */
  fromOpacity?: number;

  /** Opacity of the resting state. Used by all `Fade2` forms. Defaults to 1. */
  restOpacity?: number;

  /** Opacity towards which the element exits. Used by `Fade2` and `Fade2.Out`. Defaults to `fromOpacity`. */
  toOpacity?: number;
};
