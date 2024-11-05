export type CollapseOrientation = 'horizontal' | 'vertical';

// TODO: reduce duplication between CollapseDelayedVariantParams and CollapseVariantParams
export type CollapseDelayedVariantParams = {
  /** Time (ms) for the size expand. Defaults to the durationNormal value (200 ms). */
  enterSizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the enterSizeDuration param, to sync fade-in with expand. */
  enterOpacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the enterSizeDuration param, for temporal symmetry.. */
  exitSizeDuration?: number;

  /** Defaults to the exitSizeDuration param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;

  /** Time (ms) between the size expand start and the fade-in start. Defaults to `0`.  */
  enterDelay?: number;

  /** Time (ms) between the fade-out start and the size collapse start. Defaults to `0`.  */
  exitDelay?: number;

  /** Easing curve for the enter transition, shared by size and opacity. Defaults to the easeEaseMax value.  */
  enterEasing?: string;

  /** Easing curve for the exit transition, shared by size and opacity. Defaults to the enterEasing param. */
  exitEasing?: string;
};

export type CollapseRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;
};

export type CollapseVariantParams = {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition (expand). Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition (collapse). Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (collapse). Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};
