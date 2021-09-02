import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from './index';

import { Button } from './utils.stories';
import type { MenuProps } from './index';

export const ControllingOpenAndClose = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = (event, data) => {
    setOpen(data.open);
  };

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

ControllingOpenAndClose.parameters = {
  docs: {
    description: {
      story: [
        'The opening and close of the `Menu` can be controlled with your own state.',
        'The `onOpenChange` callback will provide the hints for the state and triggers based on the appropriate',
        'event.',
        '',
        '_When controlling the open state of the `Menu`, extra effort is required to ensure that interactions are_',
        '_still approriate and that keyboard accessibility does not degrade._',
      ].join('\n'),
    },
  },
};
