import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from './index';

import { Button } from './utils.stories';

export const DefaultOpen = () => (
  <Menu defaultOpen>
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
