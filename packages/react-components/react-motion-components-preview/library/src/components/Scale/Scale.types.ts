// eslint-disable-next-line @typescript-eslint/naming-convention
export type ScaleVariantParams_unstable = {
  /** Time (ms) for the enter transition. Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition. Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition. Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition. Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ScaleRuntimeParams_unstable = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};
