export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions & {
    /**
     * Allows to specify a reduced motion version of the animation. If provided, the settings will be used when the
     * user has enabled the reduced motion setting in the operating system. If not provided, the duration of the
     * animation will be overridden to be 1ms.
     *
     * Note, if keyframes are provided, they will be used instead of the regular keyframes.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
     */
    reducedMotion?: { keyframes?: Keyframe[] } & KeyframeEffectOptions;
  };

export type PresenceDirection = 'enter' | 'exit';

export type PresenceMotion = Record<PresenceDirection, AtomMotion | AtomMotion[]>;

/**
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
