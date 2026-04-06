import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { createMotionComponent, motionTokens, Spinner } from '@fluentui/react-components';

// A custom rotation that moves slowly and eases in and out, giving a "dreamy" feel
// instead of the default constant-speed rotation.
const DreamyRotation = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '360deg' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,

  reducedMotion: {
    duration: 6000,
    easing: motionTokens.curveLinear,
  },
});

// A custom tail motion that sweeps more slowly and with a smoother arc.
const DreamyTailMotion = createMotionComponent({
  keyframes: [{ rotate: '-135deg' }, { rotate: '0deg' }, { rotate: '225deg' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,

  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});

// Custom arc-start animation synced to the slower 3000ms timing.
const DreamyArcStartMotion = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '105deg' }, { rotate: '0deg' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,

  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});

// Custom arc-end animation synced to the slower 3000ms timing.
const DreamyArcEndMotion = createMotionComponent({
  keyframes: [{ rotate: '0deg' }, { rotate: '225deg' }, { rotate: '0deg' }],
  duration: 3000,
  iterations: Infinity,
  easing: motionTokens.curveLinear,

  reducedMotion: {
    duration: 1,
    iterations: 1,
  },
});

export const MotionCustom = (): JSXElement => (
  <Spinner
    label="Loading..."
    rotationMotion={{
      children: (_, motionProps) => <DreamyRotation {...motionProps} />,
    }}
    tailMotion={{
      children: (_, motionProps) => <DreamyTailMotion {...motionProps} />,
    }}
    arcStartMotion={{
      children: (_, motionProps) => <DreamyArcStartMotion {...motionProps} />,
    }}
    arcEndMotion={{
      children: (_, motionProps) => <DreamyArcEndMotion {...motionProps} />,
    }}
  />
);

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'The spinner animations can be customized using the [Motion APIs](?path=/docs/motion-apis-createmotioncomponent--docs), together with the `rotationMotion`, `tailMotion`, `arcStartMotion`, and `arcEndMotion` slots. This example replaces all four motion slots with slower, smoother variants that use `curveEasyEaseMax` easing for a "dreamy" feel. Passing `null` to any motion slot disables that part of the animation.',
    },
  },
};
