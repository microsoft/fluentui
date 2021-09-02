import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from './index';
import type { PopoverProps } from './index';

import { Button } from './utils.stories';
import { ExampleContent } from './utils.stories';

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (_, data) => setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button>Controlled trigger</Button>
      </PopoverTrigger>
      <PopoverSurface>
        <ExampleContent />
      </PopoverSurface>
    </Popover>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Popover` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Popover`, extra effort is required to ensure that interactions are_',
        '_still approriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
