import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuProps, MenuButton } from '@fluentui/react-components';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export const Default = () => {
  return (
    <Menu>
      <MenuTrigger>
        <MenuButton>This is a Menu Button</MenuButton>
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
