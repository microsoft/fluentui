export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceTransitionName = 'enter' | 'exit';

/** A presence motion molecule has an `enter` atom and an `exit` atom. */
export type PresenceMotion = {
  [transition in PresenceTransitionName]: AtomMotion;
};

type DurationMS = number;
type EasingString = string;

/** Standard parameters for all presence transitions. */
export type PresenceParams = { duration: DurationMS; easing: EasingString };

export type PresenceTransitionProps<CustomProps = {}> = {
  [transition in PresenceTransitionName]?: Partial<PresenceParams & CustomProps>;
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
export type PresenceOverride<CustomProps = {}> = {
  /** Override supplied properties (e.g. duration) for all transitions, i.e. the `enter` and `exit` atoms.  */
  all?: Partial<PresenceParams & CustomProps>;
} & {
  /** Override properties in specific transitions, e.g. change duration for `exit` only. */
  [transition in PresenceTransitionName]?: Partial<PresenceParams & CustomProps>;
};

export type AtomMotionFn = (element: HTMLElement) => AtomMotion;

/** A factory function to create a presence motion, which has enter and exit transitions. */
export type PresenceMotionFn<CustomProps = {}> = (
  params: { element: HTMLElement } & PresenceTransitionProps<CustomProps>,
) => PresenceMotion;

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
