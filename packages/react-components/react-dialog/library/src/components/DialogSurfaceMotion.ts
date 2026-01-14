import { createPresenceComponentVariant, motionTokens } from '@fluentui/react-motion';
import { Scale } from '@fluentui/react-motion-components-preview';

export const DialogSurfaceMotion = createPresenceComponentVariant(Scale, {
  outScale: 0.85,
  easing: motionTokens.curveDecelerateMid,
  duration: motionTokens.durationGentle,
  exitEasing: motionTokens.curveAccelerateMin,
  exitDuration: motionTokens.durationGentle,
});
