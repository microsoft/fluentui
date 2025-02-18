import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemCheckbox, MenuItem } from '@fluentui/react-menu';
import { CutRegular, CutFilled, bundleIcon } from '@fluentui/react-icons';

const CutIcon = bundleIcon(CutFilled, CutRegular);

export default {
  title: 'Menu Converged - selection',
} satisfies Meta<typeof Menu>;

export const SelectableWithLongText = () => (
  <Menu hasIcons hasCheckmarks open>
    <MenuTrigger disableButtonEnhancement>
      <button>Toggle menu</button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItemCheckbox icon={<CutIcon />} name="edit" value="cut">
          Checkbox item
        </MenuItemCheckbox>
        <MenuItem>Menu item with really long text, this is really really long text</MenuItem>
        <MenuItem>Menu item</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

SelectableWithLongText.storyName = 'selectable with long text';
