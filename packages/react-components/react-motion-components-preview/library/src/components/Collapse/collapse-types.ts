export type CollapseOrientation = 'horizontal' | 'vertical';

export type CollapseParams = {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  duration?: number;

  /** Easing curve for the enter transition (expand). Defaults to the `curveEasyEaseMax` value. */
  easing?: string;

  /** Time (ms) for the exit transition (collapse). Defaults to the `duration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition (collapse). Defaults to the `easing` param for symmetry. */
  exitEasing?: string;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;
};

export type CollapseDelayedParams = {
  /** Time (ms) for the size expand. Defaults to the `durationNormal` value (200 ms). */
  sizeDuration?: number;

  /** Time (ms) for the fade-in. Defaults to the `sizeDuration` param, to sync fade-in with expand. */
  opacityDuration?: number;

  /** Time (ms) for the size collapse. Defaults to the `sizeDuration` param, for temporal symmetry. */
  exitSizeDuration?: number;

  /** Time (ms) for the fade-out. Defaults to the `exitSizeDuration` param, to sync the fade-out with the collapse. */
  exitOpacityDuration?: number;

  /** Time (ms) between the size expand start and the fade-in start. Defaults to `0`. */
  delay?: number;

  /** Time (ms) between the fade-out start and the size collapse start. Defaults to `0`. */
  exitDelay?: number;

  /** Easing curve for the enter transition, shared by size and opacity. Defaults to the `curveEasyEaseMax` value. */
  easing?: string;

  /** Easing curve for the exit transition, shared by size and opacity. Defaults to the `easing` param. */
  exitEasing?: string;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;
};
