import * as React from 'react';
import { MenuList } from './MenuList';
import { MenuItem } from './MenuItem';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';

export function MenuButton() {
  return (
    <Menu>
      <MenuTrigger>Hover</MenuTrigger>
      <MenuList>
        <MenuItem index={1}>Item 1</MenuItem>
        <MenuItem index={2}>Item 2</MenuItem>
        <MenuItem index={3}>Item 3</MenuItem>
        <MenuItem index={4}>Item 4</MenuItem>
        <MenuItem index={5}>
          <Menu index={5}>
            <MenuTrigger>Item 5</MenuTrigger>
            <MenuList>
              <MenuItem index={6}>1</MenuItem>
              <MenuItem index={7}>2</MenuItem>
            </MenuList>
          </Menu>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
