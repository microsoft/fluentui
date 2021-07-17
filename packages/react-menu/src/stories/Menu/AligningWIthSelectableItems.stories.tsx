import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuItemCheckbox } from '../../index';
import { CutIcon } from '../../tmp-icons.stories';

export const AligningWithSelectableItems = () => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Checkbox item
        </MenuItemCheckbox>
        <MenuItem>Menu item</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

export default {
  title: 'Components/Menu',
  component: Menu,
};
