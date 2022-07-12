import * as React from 'react';
import { Button, MenuItem, Menu, MenuTrigger, MenuPopover, MenuList } from '@fluentui/react-components';

export const DefaultOpen = () => (
  <Menu defaultOpen>
    <MenuTrigger>
      <Button>Default open</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
        <MenuItem>Item</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
