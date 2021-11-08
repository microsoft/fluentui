import * as React from 'react';
import { PositioningProps } from '@fluentui/react-positioning';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';

export const Default = (props: PositioningProps) => {
  return (
    <Popover positioning={props} noArrow>
      <PopoverTrigger>
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
