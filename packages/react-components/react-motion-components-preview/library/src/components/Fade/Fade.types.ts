export type FadeVariantParams = {
  /** Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition (fade-in). Defaults to the `easeEase` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition (fade-out). Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (fade-out). Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};
