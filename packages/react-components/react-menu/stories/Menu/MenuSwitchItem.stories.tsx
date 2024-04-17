import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';
import { MenuItemSwitch } from '@fluentui/react-menu';

export const SwitchItem = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
        <MenuItemSwitch name="new-explorer" value="new-explorer">
          Try V2
        </MenuItemSwitch>
      </MenuList>
    </MenuPopover>
  </Menu>
);

SwitchItem.parameters = {
  docs: {
    description: {
      story: [
        'A variant of `MenuItemCheckbox` that displays selection using a switch design.',
        "This is commonly used for menus that dont't really have strong selection function but needs",
        'to support and exceptional selected option.',
      ].join('\n'),
    },
  },
};
