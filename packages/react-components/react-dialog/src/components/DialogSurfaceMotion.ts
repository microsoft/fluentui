import { createPresenceComponent, motionTokens } from '@fluentui/react-motion';
import { tokens } from '@fluentui/react-theme';

const keyframes = [
  { opacity: 0, boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.1)', transform: 'scale(0.85) translateZ(0)' },
  {
    boxShadow: tokens.shadow64,
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
