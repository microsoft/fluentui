import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '../index';

import { Button } from '@fluentui/react-button';

export const Default = (props: Partial<MenuProps>) => (
  <Menu {...props}>
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
