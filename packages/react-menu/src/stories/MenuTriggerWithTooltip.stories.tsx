import * as React from 'react';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '@fluentui/react-button';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../index';

export const MenuTriggerWithTooltip = () => (
  <Menu>
    <Tooltip content="This is a tooltip" relationship="description">
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>
    </Tooltip>

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

MenuTriggerWithTooltip.parameters = {
  docs: {
    description: {
      story: ['A trigger for `Menu` can also have a tooltip.'].join('\n'),
    },
  },
};
