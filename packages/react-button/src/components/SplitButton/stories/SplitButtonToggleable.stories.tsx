import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { SplitButton, ToggleButton } from '../../../index';
import type { MenuButtonProps } from '../../../index';

export const Toggleable = () => {
  return (
    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton primaryActionButton={{ as: ToggleButton }} menuButton={triggerProps}>
            Example
          </SplitButton>
        )}
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
