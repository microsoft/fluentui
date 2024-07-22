import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';

export const Default = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
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
