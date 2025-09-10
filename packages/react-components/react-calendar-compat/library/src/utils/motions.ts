import { motionTokens, createMotionComponentVariant } from '@fluentui/react-motion';
import { Slide } from '@fluentui/react-motion-components-preview';

export const SlideUp = createMotionComponentVariant(Slide.In, {
  fromY: '20px',
  duration: 367,
  easing: motionTokens.curveDecelerateMax,
});

export const SlideDown = createMotionComponentVariant(Slide.In, {
  fromY: '-20px',
  duration: 367,
  easing: motionTokens.curveDecelerateMax,
});

export const SlideLeft = createMotionComponentVariant(Slide.In, {
  fromX: '20px',
  fromY: '0px',
  duration: 367,
  easing: motionTokens.curveDecelerateMax,
});

export const SlideRight = createMotionComponentVariant(Slide.In, {
  fromX: '-20px',
  fromY: '0px',
  duration: 367,
  easing: motionTokens.curveDecelerateMax,
});

// export const CalendarSlide =
