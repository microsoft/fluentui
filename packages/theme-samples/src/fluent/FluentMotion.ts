import { IRawStyle, keyframes } from '@uifabric/merge-styles';

const fadeInKeyframes: string = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const fadeOutKeyframes: string = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
});

const scaleDownInKeyframes: string = keyframes({
  from: { transform: 'scale3d(1.15, 1.15, 1)' },
  to: { transform: 'scale3d(1, 1, 1)' }
});

const scaleDownOutKeyframes: string = keyframes({
  from: { transform: 'scale3d(1, 1, 1)' },
  to: { transform: 'scale3d(0.9, 0.9, 1)' }
});

const slideLeftOutKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(-48px, 0, 0)' }
});

const slideRightOutKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(48px, 0, 0)' }
});

const slideLeftInKeyframes: string = keyframes({
  from: { transform: 'translate3d(48px, 0, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' }
});

const slideRightInKeyframes: string = keyframes({
  from: { transform: 'translate3d(-48px, 0, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' }
});

const slideUpOutKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(0, -48px, 0)' }
});

const slideDownOutKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(0, 48px, 0)' }
});

const slideUpInKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, 48px, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' }
});

const slideDownInKeyframes: string = keyframes({
  from: { transform: 'translate3d(0, -48px, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' }
});

function _createAnimation(animationName: string, animationDuration: string, animationTimingFunction: string): IRawStyle {
  return {
    animationName,
    animationDuration,
    animationTimingFunction,
    animationFillMode: 'both'
  };
}

export namespace MotionDurations {
  export const duration1 = '100ms';
  export const duration2 = '200ms';
  export const duration3 = '300ms';
  export const duration4 = '400ms';
}

export namespace MotionTimings {
  export const accelerate = 'cubic-bezier(0.9, 0.1, 1, 0.2)';
  export const decelerate = 'cubic-bezier(0.1, 0.9, 0.2, 1)';
  export const linear = 'cubic-bezier(0, 0, 1, 1)';
  export const standard = 'cubic-bezier(0.8, 0, 0.2, 1)';
}

export namespace MotionAnimations {
  export const fadeIn = _createAnimation(fadeInKeyframes, MotionDurations.duration1, MotionTimings.linear);
  export const fadeOut = _createAnimation(fadeOutKeyframes, MotionDurations.duration1, MotionTimings.linear);
  export const scaleDownIn = _createAnimation(scaleDownInKeyframes, MotionDurations.duration3, MotionTimings.decelerate);
  export const scaleDownOut = _createAnimation(scaleDownOutKeyframes, MotionDurations.duration3, MotionTimings.decelerate);
  export const slideLeftOut = _createAnimation(slideLeftOutKeyframes, MotionDurations.duration1, MotionTimings.accelerate);
  export const slideRightOut = _createAnimation(slideRightOutKeyframes, MotionDurations.duration1, MotionTimings.accelerate);
  export const slideLeftIn = _createAnimation(slideLeftInKeyframes, MotionDurations.duration1, MotionTimings.decelerate);
  export const slideRightIn = _createAnimation(slideRightInKeyframes, MotionDurations.duration1, MotionTimings.decelerate);
  export const slideUpOut = _createAnimation(slideUpOutKeyframes, MotionDurations.duration1, MotionTimings.accelerate);
  export const slideDownOut = _createAnimation(slideDownOutKeyframes, MotionDurations.duration1, MotionTimings.accelerate);
  export const slideUpIn = _createAnimation(slideUpInKeyframes, MotionDurations.duration1, MotionTimings.decelerate);
  export const slideDownIn = _createAnimation(slideDownInKeyframes, MotionDurations.duration1, MotionTimings.decelerate);
}
