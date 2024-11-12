// eslint-disable-next-line @typescript-eslint/naming-convention
export type ScaleRuntimeParams_unstable = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ScaleVariantParams_unstable = {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  enterScaleDuration?: number;

  /** Easing curve for the enter transition (expand). Defaults to the `easeEaseMax` value.  */
  enterScaleEasing?: string;

  /** Time (ms) for the exit transition (collapse). Defaults to the `enterDuration` param for symmetry. */
  exitScaleDuration?: number;

  /** Easing curve for the exit transition (collapse). Defaults to the `enterEasing` param for symmetry.  */
  exitScaleEasing?: string;
};
