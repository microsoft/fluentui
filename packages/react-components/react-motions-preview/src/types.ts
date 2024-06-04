export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceTransitionName = 'enter' | 'exit';

/** A presence motion molecule has an `enter` atom and an `exit` atom. */
export type PresenceMotion = {
  [transition in PresenceTransitionName]: AtomMotion | AtomMotion[];
};

type DurationMS = number;
type EasingString = string;

/** Standard parameters for all presence transitions. */
export type PresenceOverrideFields = { duration: DurationMS; easing: EasingString };

export type PresenceTransitionProps<CustomOverrideFields = {}> = {
  // TODO: make each transition optional?
  // [transition in PresenceTransitionName | 'all']?: Partial<PresenceOverrideFields & CustomOverrideFields>;
  [transition in PresenceTransitionName]: Partial<PresenceOverrideFields & CustomOverrideFields> | undefined;
};

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
export type PresenceOverride<CustomOverrideFields = {}> = {
  /** Override supplied properties (e.g. duration) for all transitions, i.e. the `enter` and `exit` atoms.  */
  all?: Partial<PresenceOverrideFields & CustomOverrideFields>;
} & {
  /** Override properties in specific transitions, e.g. change duration for `exit` only. */
  [transition in PresenceTransitionName]?: Partial<PresenceOverrideFields & CustomOverrideFields>;
};

export type AtomMotionFn = (params: { element: HTMLElement }) => AtomMotion | AtomMotion[];
export type PresenceMotionFn = (params: { element: HTMLElement }) => PresenceMotion;

// ---

export type AnimationHandle = Pick<Animation, 'cancel' | 'finish' | 'pause' | 'play' | 'playbackRate'> & {
  onfinish: () => void;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
