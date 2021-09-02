import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from './index';
import { Button } from './utils.stories';
import { ExampleContent } from './utils.stories';

export const TrappingFocus = () => (
  <Popover trapFocus>
    <PopoverTrigger>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    <PopoverSurface>
      <ExampleContent />

      <div>
        <Button>Action</Button>
        <Button>Action</Button>
      </div>
    </PopoverSurface>
  </Popover>
);

TrappingFocus.parameters = {
  docs: {
    description: {
      story: [
        'When a `Popover` contains focusable elements, the modal dialog pattern will apply. By using the `trapFocus`',
        'prop, the component sets `aria-hidden`appropriately to parent elements in the document so that elements',
        'not contained in the focus trap are hidden to screen reader users. This focus trap is automatically removed',
        'when the `Popover` is closed.',
      ].join('\n'),
    },
  },
};
