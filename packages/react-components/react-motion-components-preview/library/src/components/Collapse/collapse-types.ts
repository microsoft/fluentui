export type CollapseOrientation = 'horizontal' | 'vertical';

/** Common properties shared by all collapse components */
type CollapseBaseParams = {
  /** Easing curve for the enter transition. Defaults to the `curveEasyEaseMax` value. */
  easing?: string;

  /** Easing curve for the exit transition. Defaults to the `easing` param for symmetry. */
  exitEasing?: string;

  /** The orientation of the size animation. Defaults to `'vertical'` to expand/collapse the height. */
  orientation?: CollapseOrientation;

  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

export type CollapseParams = CollapseBaseParams & {
  /** Time (ms) for the enter transition (expand). Defaults to the `durationNormal` value (200 ms). */
  duration?: number;

  /** Time (ms) for the exit transition (collapse). Defaults to the `duration` param for symmetry. */
  exitDuration?: number;
};

export type CollapseDelayedParams = CollapseBaseParams & {
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
};
