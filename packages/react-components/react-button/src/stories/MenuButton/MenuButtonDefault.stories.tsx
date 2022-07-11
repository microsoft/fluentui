import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuButton } from '@fluentui/react-components';

export const Default = () => {
  return (
    <Menu>
      <MenuTrigger>
        <MenuButton>Example</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
