import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuSplitGroup_unstable } from '../index';

import { Button } from '@fluentui/react-button';

export const SplitMenuItem = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <Menu>
          <MenuSplitGroup_unstable>
            <MenuItem>Open</MenuItem>
            <MenuTrigger>
              <MenuItem />
            </MenuTrigger>
          </MenuSplitGroup_unstable>
          <MenuPopover>
            <MenuList>
              <MenuItem>In browser</MenuItem>
              <MenuItem>In desktop app</MenuItem>
              <MenuItem>In mobile</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <MenuItem>Preferences</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
