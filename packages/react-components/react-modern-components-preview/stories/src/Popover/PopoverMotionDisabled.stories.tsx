import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-modern-components-preview/popover';

export const MotionDisabled = (): React.ReactNode => (
  <Popover surfaceMotion={null}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Open popover</Button>
    </PopoverTrigger>
    <PopoverSurface>Popover with motion disabled</PopoverSurface>
  </Popover>
);

MotionDisabled.parameters = {
  docs: {
    description: {
      story: 'Set `surfaceMotion` to `null` to disable the Popover animation.',
    },
  },
};
