import * as React from 'react';
import { MenuList } from './MenuList';
import { MenuItem } from './MenuItem';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';

export function MenuButton() {
  return (
    <Menu>
      <MenuTrigger>
        <div
          tabIndex={0}
          style={{
            border: '1px solid black',
            width: 55,
            textAlign: 'center',
          }}
        >
          Menu v
        </div>
      </MenuTrigger>
      <MenuList>
        <MenuItem index={1}>Item 1</MenuItem>
        <MenuItem index={2}>Item 2</MenuItem>
        <MenuItem index={3}>Item 3</MenuItem>
        <MenuItem index={4}>Item 4</MenuItem>
        <Menu>
          <MenuTrigger>
            <MenuItem index={5}>Item 5</MenuItem>
          </MenuTrigger>
          <MenuList>
            <MenuItem index={1}>item 1</MenuItem>
            <MenuItem index={2}>item 2</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem index={3}>Item 3</MenuItem>
              </MenuTrigger>
              <MenuList>
                <MenuItem index={1}>1</MenuItem>
                <MenuItem index={2}>2</MenuItem>
              </MenuList>
            </Menu>
          </MenuList>
        </Menu>
      </MenuList>
    </Menu>
  );
}
