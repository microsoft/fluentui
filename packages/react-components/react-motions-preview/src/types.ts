import { MOTION } from './constants';

export type AtomMotion = { keyframes: Keyframe[]; persist?: boolean } & KeyframeEffectOptions;

export type AtomMotionCollection = {
  [MOTION]: true;
  motions: AtomMotion[];
};

export type PresenceMotion = {
  enter: AtomMotion | AtomMotionCollection;
  exit: AtomMotion | AtomMotionCollection;
};

export type AtomMotionFn = (element: HTMLElement) => AtomMotion | AtomMotionCollection;
export type PresenceMotionFn = (element: HTMLElement) => PresenceMotion;

export type MotionImperativeRef = {
  /** Sets the playback rate of the animation, where 1 is normal speed. */
  setPlaybackRate: (rate: number) => void;

  /** Sets the state of the animation to running or paused. */
  setPlayState: (state: 'running' | 'paused') => void;
};
