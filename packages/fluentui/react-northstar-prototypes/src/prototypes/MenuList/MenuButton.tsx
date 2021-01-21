import * as React from 'react';
import { MenuList } from './MenuList';
import { MenuItem } from './MenuItem';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';
import { MenuDivider } from './MenuDivider';
import { MenuSectionHeader } from './MenuSectionHeader';
import { MenuGroup } from './MenuGroup';
import { MenuItemCheckbox } from './MenuItemCheckbox';

export function MenuButton() {
  // eslint-disable-next-line no-console
  const onItemChecked = (checkedItems: number) => console.log(`checked items: ${checkedItems}`);

  return (
    <Menu onItemChecked={onItemChecked}>
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
        <MenuDivider />
        <MenuGroup>
          <MenuSectionHeader>Checkbox group</MenuSectionHeader>
          <MenuItemCheckbox value={1} index={6}>
            Check
          </MenuItemCheckbox>
          <MenuItemCheckbox value={2} index={7}>
            Check
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
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
