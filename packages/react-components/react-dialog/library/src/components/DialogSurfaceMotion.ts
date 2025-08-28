import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';

const keyframes = [
  {
    opacity: 0,
    transform: 'scale(0.85) translateZ(0)',
  },
  {
    transform: 'scale(1) translateZ(0)',
    opacity: 1,
  },
];

export const DialogSurfaceMotion = createPresenceComponent({
  enter: {
    keyframes,
    easing: motionTokens.curveDecelerateMid,
    duration: motionTokens.durationGentle,
  },
  exit: {
    keyframes: [...keyframes].reverse(),
    easing: motionTokens.curveAccelerateMin,
    duration: motionTokens.durationGentle,
  },
});
