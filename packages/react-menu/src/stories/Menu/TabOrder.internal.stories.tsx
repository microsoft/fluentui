import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuProps, MenuPopover } from '../../index';

export const TabOrderInternal = (props: Partial<MenuProps>) => (
  <>
    <button>Tabstop</button>
    <Menu {...props}>
      <MenuTrigger>
        <button>Menu trigger</button>
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
    <button>Tabstop</button>
  </>
);

export default {
  title: 'Components/Menu',
  component: Menu,
};
