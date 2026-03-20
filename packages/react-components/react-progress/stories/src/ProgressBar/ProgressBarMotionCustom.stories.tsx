import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { createMotionComponent, Field, ProgressBar } from '@fluentui/react-components';

// A custom motion component that swings between left and right, instead of always moving to the right.
// The reduced motion version of the animation moves more slowly, with no acceleration, using a gentler gradient.
const SwingMotion = createMotionComponent({
  // The gradient bar is 33% of the container
  keyframes: [{ translate: '-100%' }, { translate: '300%' }],
  duration: 2000,
  easing: 'ease-in-out',
  direction: 'alternate', // loop by reversing direction
  iterations: Infinity,

  reducedMotion: {
    // The gradient bar is 100% of the container for reduced motion, which is 3x wider
    keyframes: [{ translate: '-100%' }, { translate: '100%' }],
    duration: 6000, // slower speed
    easing: 'linear', // no acceleration
  },
});

export const MotionCustom = (): JSXElement => (
  <Field validationMessage="Custom indeterminate animation" validationState="none">
    <ProgressBar
      indeterminateMotion={{
        children: (_, motionProps) => <SwingMotion {...motionProps} />,
      }}
    />
  </Field>
);

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'The indeterminate animation can be customized using the [Motion APIs](?path=/docs/motion-apis-createmotioncomponent--docs), together with the `indeterminateMotion` slot.',
    },
  },
};
