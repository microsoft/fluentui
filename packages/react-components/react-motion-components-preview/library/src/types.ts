import type { MotionParam, PresenceMotion, PresenceMotionFn, PresenceDirection } from '@fluentui/react-motion';

/**
 * This is a factory function that generates a motion object from variant params, e.g. duration, easing, etc.
 * The generated object defines a presence motion with `enter` and `exit` transitions.
 * This motion object is declarative, i.e. data without side effects,
 * and it is framework-independent, i.e. non-React.
 * It can be turned into a React component using `createPresenceComponent`.
 */
// TODO: move to @fluentui/react-motion when stable
export type PresenceMotionCreator<MotionVariantParams extends Record<string, MotionParam> = {}> = (
  variantParams?: MotionVariantParams,
) => PresenceMotion;

/**
 * This is a factory function that generates a motion function, which has variant params bound into it.
 * The generated motion function accepts other runtime params that aren't locked into the variant, but supplied at runtime.
 * This separation allows the variant to be defined once and reused with different runtime params which may be orthogonal to the variant params.
 * For example, a variant may define the duration and easing of a transition, which are fixed for all instances of the variant,
 * while the runtime params may give access to the target element, which is different for each instance.
 *
 * The generated motion function is also framework-independent, i.e. non-React.
 * It can be turned into a React component using `createPresenceComponent`.
 */
// TODO: move to @fluentui/react-motion when stable
export type PresenceMotionFnCreator<
  MotionVariantParams extends Record<string, MotionParam> = {},
  MotionRuntimeParams extends Record<string, MotionParam> = {},
> = (variantParams?: MotionVariantParams) => PresenceMotionFn<MotionRuntimeParams>;

/**
 * Common duration parameters for presence motion components.
 */
export type PresenceDuration = {
  /** Time (ms) for the enter transition. */
  duration?: number;

  /** Time (ms) for the exit transition. Defaults to the `duration` param for symmetry. */
  exitDuration?: number;
};

/**
 * Common easing parameters for presence motion components.
 */
export type PresenceEasing = {
  /** Easing curve for the enter transition. */
  easing?: string;

  /** Easing curve for the exit transition. Defaults to the `easing` param for symmetry. */
  exitEasing?: string;
};

/**
 * Common delay parameters for presence motion components.
 */
export type PresenceDelay = {
  /** Time (ms) to delay the enter transition. */
  delay?: EffectTiming['delay'];

  /** Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry. */
  exitDelay?: EffectTiming['delay'];
};

/**
 * Base presence parameters combining duration, easing, and delay for motion components.
 */
export type BasePresenceParams = PresenceDuration & PresenceEasing & PresenceDelay;

/**
 * Common opacity animation parameter for motion components.
 */
export type AnimateOpacity = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

/**
 * Common parameters shared by all atom functions.
 */
export type BaseAtomParams = {
  /** The functional direction of the motion: 'enter' or 'exit'. */
  direction: PresenceDirection;
  /** The duration of the motion in milliseconds. */
  duration: number;
  /** The easing curve for the motion. */
  easing?: EffectTiming['easing'];
  /** Time (ms) to delay the animation. */
  delay?: EffectTiming['delay'];
};
