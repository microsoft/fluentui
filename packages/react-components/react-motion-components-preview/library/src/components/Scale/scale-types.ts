export type ScaleParams = {
  /** Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms). */
  duration?: number;

  /** Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms). */
  exitDuration?: number;

  /** Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.  */
  exitEasing?: string;

  /** The scale value to animate from. Defaults to `0.9`. */
  fromScale?: number;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};
