import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from './index';
import type { PopoverProps } from './index';
import { Button } from './utils.stories';
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
