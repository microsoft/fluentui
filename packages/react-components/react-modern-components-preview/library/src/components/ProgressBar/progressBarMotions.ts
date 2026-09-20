import { createMotionComponent, motionTokens } from '@fluentui/react-motion';

export const ProgressBarIndeterminateMotion = createMotionComponent({
  keyframes: [{ translate: '-100%' }, { translate: '300%' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,
  reducedMotion: {
    keyframes: [{ opacity: 0.2 }, { opacity: 1 }, { opacity: 0.2 }],
    duration: 3000,
    iterations: Infinity,
  },
});
