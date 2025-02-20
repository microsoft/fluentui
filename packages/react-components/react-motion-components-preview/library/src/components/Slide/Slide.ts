import { motionTokens, createPresenceComponent } from '@fluentui/react-motion';
import { PresenceMotionFnCreator } from '../../types';
import { SlideRuntimeParams_unstable, SlideVariantParams_unstable } from './Slide.types';

/** Define a presence motion for slide in/out */
export const createSlidePresence: PresenceMotionFnCreator<SlideVariantParams_unstable, SlideRuntimeParams_unstable> =
  ({
    enterDuration = motionTokens.durationGentle,
    enterEasing = motionTokens.curveDecelerateMax,
    exitDuration = motionTokens.durationNormal,
    exitEasing = motionTokens.curveAccelerateMax,
  } = {}) =>
  ({ animateOpacity = true }) => {
    const fromOpacity = animateOpacity ? 0 : 1;
    const toOpacity = 1;
    const fromSlide = 0.9; // Could be a custom param in the future
    const toSlide = 1;

    const enterKeyframes = [
      { opacity: fromOpacity, transform: `scale3d(${fromSlide}, ${fromSlide}, 1)`, visibility: 'visible' },
      { opacity: toOpacity, transform: `scale3d(${toSlide}, ${toSlide}, 1)` },
    ];

    const exitKeyframes = [
      { opacity: toOpacity, transform: `scale3d(${toSlide}, ${toSlide}, 1)` },
      { opacity: fromOpacity, transform: `scale3d(${fromSlide}, ${fromSlide}, 1)`, visibility: 'hidden' },
    ];
    return {
      enter: {
        duration: enterDuration,
        easing: enterEasing,
        keyframes: enterKeyframes,
      },
      exit: { duration: exitDuration, easing: exitEasing, keyframes: exitKeyframes },
    };
  };

/** A React component that applies slide in/out transitions to its children. */
export const Slide = createPresenceComponent(createSlidePresence());

export const SlideSnappy = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationNormal,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationFast,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);

export const SlideRelaxed = createPresenceComponent(
  createSlidePresence({
    enterDuration: motionTokens.durationSlow,
    enterEasing: motionTokens.curveDecelerateMax,
    exitDuration: motionTokens.durationGentle,
    exitEasing: motionTokens.curveAccelerateMax,
  }),
);
