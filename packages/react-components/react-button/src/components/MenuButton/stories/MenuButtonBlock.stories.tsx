import * as React from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { MenuButton } from '../../../MenuButton';

export const Block = () => (
  <Menu>
    <MenuTrigger>
      <MenuButton block>Block</MenuButton>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>Item a</MenuItem>
        <MenuItem>Item b</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A menu button can fill the width of its container.',
    },
  },
};
