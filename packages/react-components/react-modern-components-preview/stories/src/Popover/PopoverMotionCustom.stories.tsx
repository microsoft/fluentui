import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-modern-components-preview/popover';
import { Fade } from '@fluentui/react-motion-components-preview';

export const MotionCustom = (): React.ReactNode => (
  <Popover
    surfaceMotion={{
      children: (_, motionProps) => <Fade {...motionProps} duration={500} />,
    }}
  >
    <PopoverTrigger disableButtonEnhancement>
      <Button>Open popover</Button>
    </PopoverTrigger>
    <PopoverSurface>Popover with a custom fade duration</PopoverSurface>
  </Popover>
);

MotionCustom.parameters = {
  docs: {
    description: {
      story: 'Customize Popover animation through the `surfaceMotion` slot.',
    },
  },
};
