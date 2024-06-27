import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';

const keyframes = [{ opacity: 0 }, { opacity: 1 }];

export const DialogBackdropMotion = createPresenceComponent({
  enter: {
    keyframes,
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle,
  },
  exit: {
    keyframes: [...keyframes].reverse(),
    easing: motionTokens.curveLinear,
    duration: motionTokens.durationGentle,
  },
});
