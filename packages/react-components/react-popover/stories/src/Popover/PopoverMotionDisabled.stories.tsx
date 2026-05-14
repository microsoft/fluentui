import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

export const MotionDisabled = (): JSXElement => (
  <Popover surfaceMotion={null}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Open popover</Button>
    </PopoverTrigger>

    <PopoverSurface tabIndex={-1}>
      <h3 style={{ marginTop: 0 }}>Popover content</h3>
      <p>This popover has motion disabled</p>
    </PopoverSurface>
  </Popover>
);

MotionDisabled.parameters = {
  docs: {
    description: {
      story: 'To disable the Popover transition animation, set the `surfaceMotion` prop to `null`.',
    },
  },
};
