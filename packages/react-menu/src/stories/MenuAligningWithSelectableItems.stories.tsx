import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuItemCheckbox, MenuPopover } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';
import { Cut20Regular as CutIcon } from '@fluentui/react-icons';

export const AligningWithSelectableItems = () => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger>
      <Button>Toggle menu</Button>
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

AligningWithSelectableItems.parameters = {
  docs: {
    description: {
      story: ['The `hasCheckmarks` prop will align menu items if only a subset of menu items are selectable.'].join(
        '\n',
      ),
    },
  },
};
