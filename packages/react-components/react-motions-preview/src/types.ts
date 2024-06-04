export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceMotion = {
  enter: AtomMotion | AtomMotion[];
  exit: AtomMotion | AtomMotion[];
};

export type AtomMotionFn = (element: HTMLElement) => AtomMotion | AtomMotion[];
export type PresenceMotionFn = (element: HTMLElement) => PresenceMotion;

// ---

export type AnimationHandle = Pick<Animation, 'cancel' | 'finish' | 'pause' | 'play' | 'playbackRate'> & {
  onfinish: () => void;
};

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;

  /**
   * Cancels the animation and keyframe effects, jumping to the end of the animation if it's currently playing.
   * https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel
   */
  cancel: () => void;
};
