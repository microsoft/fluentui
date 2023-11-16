export type MotionAtom = {
  keyframes: Keyframe[];
  options: KeyframeEffectOptions;
};

export type MotionTransition = {
  enter: MotionAtom;
  exit: MotionAtom;
};
