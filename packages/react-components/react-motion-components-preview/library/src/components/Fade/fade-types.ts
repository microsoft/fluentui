export type FadeParams = {
  /** Time (ms) for the enter transition (fade-in). Defaults to the `durationNormal` value (200 ms). */
  duration?: number;

  /** Easing curve for the enter transition (fade-in). Defaults to the `curveEasyEase` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (fade-out). Defaults to the `duration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (fade-out). Defaults to the `easing` param for symmetry.  */
  exitEasing?: string;
};
