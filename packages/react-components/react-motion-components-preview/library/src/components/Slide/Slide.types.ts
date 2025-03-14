export type SlideOrientation = 'horizontal' | 'vertical';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SlideVariantParams = {
  /** Time (ms) for the enter transition. Defaults to the `durationNormal` value (200 ms). */
  duration?: number;

  /** Easing curve for the enter transition. Defaults to the `curveDecelerateMid` value.  */
  easing?: string;

  /** Time (ms) for the exit transition. Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition. Defaults to the `curveAccelerateMid` value.  */
  exitEasing?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SlideRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /**
   * The orientation of the slide animation: 'horizontal' or 'vertical'
   * @default 'vertical'
   */
  orientation?: SlideOrientation;

  /**
   * The distance of the slide, relative to the content's natural position.
   * Can be positive or negative, in pixels or other length units.
   * @default '10px'
   */
  distance?: string;
};
