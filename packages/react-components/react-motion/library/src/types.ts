export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceDirection = 'enter' | 'exit';

export type PresenceMotion = {
  [transition in PresenceDirection]: AtomMotion | AtomMotion[];
};

/**
 * @internal
 *
 * A motion param should be a primitive value that can be serialized to JSON and could be potentially used a plain
 * dependency for React hooks.
 */
export type MotionParam = boolean | number | string;

export type AtomMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => AtomMotion | AtomMotion[];

export type PresenceMotionFn<MotionParams extends Record<string, MotionParam> = {}> = (
  params: { element: HTMLElement } & MotionParams,
) => PresenceMotion;

// ---

export type AnimationHandle = Pick<Animation, 'cancel' | 'finish' | 'pause' | 'play' | 'playbackRate'> & {
  setMotionEndCallbacks: (onfinish: () => void, oncancel: () => void) => void;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};

type DurationMS = number;
type EasingString = string;

/** Standard parameters for all presence transitions. */
export type PresenceOverrideFields = { duration: DurationMS; easing: EasingString };

/**
 * Override properties for presence transitions.
 *
 * @example <caption>Override duration for all transitions</caption>
 * ```
 * const override: PresenceOverride = {
 *  all: { duration: 1000 },
 * };
 * ```
 *
 * @example <caption>Override easing for exit transition</caption>
 * ```
 * const override: PresenceOverride = {
 *  exit: { easing: 'ease-out' },
 * };
 * ```
 */
export type PresenceOverride<CustomParams extends Record<string, MotionParam> = {}> = {
  /** Override supplied properties (e.g. duration) for all transitions, i.e. the `enter` and `exit` atoms.  */
  all?: Partial<PresenceOverrideFields & CustomParams>;
} & {
  /** Override properties in specific transitions, e.g. change duration for `exit` only. */
  [transition in PresenceDirection]?: Partial<PresenceOverrideFields & CustomParams>;
};
