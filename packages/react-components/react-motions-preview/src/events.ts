export type MotionFinishEventDetail = {
  direction: 'enter' | 'exit';
  animationEvent: AnimationPlaybackEvent;
};
export type MotionFinishEvent = CustomEvent<MotionFinishEventDetail>;

export const MOTION_FINISH_EVENT = 'fui-motion-finish';
