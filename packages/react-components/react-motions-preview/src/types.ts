export type AtomMotion = { keyframes: Keyframe[] } & KeyframeEffectOptions;

export type PresenceMotion = {
  enter: AtomMotion;
  exit: AtomMotion;
};

export type AtomMotionFn = (element: HTMLElement) => AtomMotion;
/** A factory function to create a presence motion, which has enter and exit transitions. */
export type PresenceMotionFn<CustomProps = {}> = (params: { element: HTMLElement } & CustomProps) => PresenceMotion;

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
