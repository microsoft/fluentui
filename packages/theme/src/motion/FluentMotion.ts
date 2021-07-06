import { keyframes } from '@fluentui/merge-styles';

const fadeInAnimationName: string = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOutAnimationName: string = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const scaleDownInAnimationName: string = keyframes({
  from: { transform: 'scale3d(1.15, 1.15, 1)' },
  to: { transform: 'scale3d(1, 1, 1)' },
});

const scaleDownOutAnimationName: string = keyframes({
  from: { transform: 'scale3d(1, 1, 1)' },
  to: { transform: 'scale3d(0.9, 0.9, 1)' },
});

const slideLeftOutAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(-48px, 0, 0)' },
});

const slideRightOutAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(48px, 0, 0)' },
});

const slideLeftInAnimationName: string = keyframes({
  from: { transform: 'translate3d(48px, 0, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' },
});

const slideRightInAnimationName: string = keyframes({
  from: { transform: 'translate3d(-48px, 0, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' },
});

const slideUpOutAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(0, -48px, 0)' },
});

const slideDownOutAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, 0, 0)' },
  to: { transform: 'translate3d(0, 48px, 0)' },
});

const slideUpInAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, 48px, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' },
});

const slideDownInAnimationName: string = keyframes({
  from: { transform: 'translate3d(0, -48px, 0)' },
  to: { transform: 'translate3d(0, 0, 0)' },
});

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

function _createAnimation(animationName: string, animationDuration: string, animationTimingFunction: string): string {
  return `${animationName} ${animationDuration} ${animationTimingFunction}`;
}

export namespace MotionAnimations {
  export const fadeIn = _createAnimation(fadeInAnimationName, MotionDurations.duration1, MotionTimings.linear);
  export const fadeOut = _createAnimation(fadeOutAnimationName, MotionDurations.duration1, MotionTimings.linear);
  export const scaleDownIn = _createAnimation(
    scaleDownInAnimationName,
    MotionDurations.duration3,
    MotionTimings.decelerate,
  );
  export const scaleDownOut = _createAnimation(
    scaleDownOutAnimationName,
    MotionDurations.duration3,
    MotionTimings.decelerate,
  );
  export const slideLeftOut = _createAnimation(
    slideLeftOutAnimationName,
    MotionDurations.duration1,
    MotionTimings.accelerate,
  );
  export const slideRightOut = _createAnimation(
    slideRightOutAnimationName,
    MotionDurations.duration1,
    MotionTimings.accelerate,
  );
  export const slideLeftIn = _createAnimation(
    slideLeftInAnimationName,
    MotionDurations.duration1,
    MotionTimings.decelerate,
  );
  export const slideRightIn = _createAnimation(
    slideRightInAnimationName,
    MotionDurations.duration1,
    MotionTimings.decelerate,
  );
  export const slideUpOut = _createAnimation(
    slideUpOutAnimationName,
    MotionDurations.duration1,
    MotionTimings.accelerate,
  );
  export const slideDownOut = _createAnimation(
    slideDownOutAnimationName,
    MotionDurations.duration1,
    MotionTimings.accelerate,
  );
  export const slideUpIn = _createAnimation(
    slideUpInAnimationName,
    MotionDurations.duration1,
    MotionTimings.decelerate,
  );
  export const slideDownIn = _createAnimation(
    slideDownInAnimationName,
    MotionDurations.duration1,
    MotionTimings.decelerate,
  );
}
