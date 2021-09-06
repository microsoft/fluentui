import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface, PopoverProps } from '@fluentui/react-popover';
import { Button } from '@fluentui/react-button';
import { ExampleContent } from './utils.stories';

export const Default = (props: PopoverProps) => (
  <Popover {...props}>
    <PopoverTrigger>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);

Default.argTypes = {
  positioning: {
    control: {
      disable: true,
    },
  },
  defaultOpen: {
    control: {
      disable: true,
    },
  },
  mountNode: {
    control: {
      disable: true,
    },
  },
};
