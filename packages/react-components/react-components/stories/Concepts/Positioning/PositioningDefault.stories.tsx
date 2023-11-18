import * as React from 'react';
import { Button, Popover, PopoverSurface, PopoverTrigger, PositioningProps } from '@fluentui/react-components';

export const Default = (props: PositioningProps) => {
  return (
    <Popover positioning={props}>
      <PopoverTrigger disableButtonEnhancement>
        <Button appearance="primary">Click me</Button>
      </PopoverTrigger>

      <PopoverSurface style={{ minWidth: 100 }}>Container</PopoverSurface>
    </Popover>
  );
};

Default.argTypes = {
  flipBoundary: {
    control: {
      disable: true,
    },
  },
  overflowBoundary: {
    control: {
      disable: true,
    },
  },
  target: {
    control: {
      disable: true,
    },
  },
};
