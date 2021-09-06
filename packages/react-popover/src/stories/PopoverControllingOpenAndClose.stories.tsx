import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import type { PopoverProps } from '@fluentui/react-popover';

import { Button } from '@fluentui/react-button';
import { ExampleContent } from './utils.stories';

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenChange: PopoverProps['onOpenChange'] = (_, data) => setOpen(data.open || false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(e.target.checked);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger>
          <Button>Controlled trigger</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <ExampleContent />
        </PopoverSurface>
      </Popover>

      <label style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
        open
        <input type="checkbox" name="state" value="open" checked={open} onChange={onChange} />
      </label>
    </div>
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
