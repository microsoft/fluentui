import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

export const Default = () => (
  <Menu positioning="below-end">
    <MenuTrigger>
      {(triggerProps: MenuButtonProps) => <SplitButton menuButton={triggerProps}>Example</SplitButton>}
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
