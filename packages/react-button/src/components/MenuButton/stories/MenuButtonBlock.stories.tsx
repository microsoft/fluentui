import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuButton } from '@fluentui/react-components';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export const Block = () => (
  <Menu>
    <MenuTrigger>
      <MenuButton block>This is a Menu Button</MenuButton>
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
