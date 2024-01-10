export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceMotion = {
  enter: AtomMotion;
  exit: AtomMotion;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
