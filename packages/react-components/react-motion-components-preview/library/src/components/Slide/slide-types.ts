export type SlideParams = {
  /** Time (ms) for the enter transition (slide-in). Defaults to the `durationNormal` value (250 ms). */
  duration?: number;

  /** Easing curve for the enter transition (slide-in). Defaults to the `curveDecelerateMid` value.  */
  easing?: string;

  /** Time (ms) for the exit transition (slide-out). Defaults to the `duration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (slide-out). Defaults to the `curveAccelerateMid` value.  */
  exitEasing?: string;

  /** The X translate value with units to animate from. Defaults to `'0px'`. */
  fromX?: string;

  /** The Y translate value with units to animate from. Defaults to `'20px'`. */
  fromY?: string;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};
