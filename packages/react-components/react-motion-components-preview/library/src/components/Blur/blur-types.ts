export type BlurParams = {
  /** The radius of pixels to blend into the blur. A length string, defaulting to '20px'. */
  fromRadius?: string;

  /** Time (ms) for the enter transition (blur-in). Defaults to the `durationSlow` value (500 ms). */
  duration?: number;

  /** Easing curve for the enter transition (blur-in). Defaults to the `curveDecelerateMin` value. */
  easing?: string;

  /** Time (ms) for the exit transition (blur-out). Defaults to the enter duration. */
  exitDuration?: number;

  /** Easing curve for the exit transition (blur-out). Defaults to the `curveAccelerateMin` value. */
  exitEasing?: string;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};
