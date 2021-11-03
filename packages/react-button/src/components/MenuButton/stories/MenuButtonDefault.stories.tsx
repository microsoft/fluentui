import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
/* eslint-enable @typescript-eslint/ban-ts-comment */
import { MenuButton } from '../../../MenuButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Default = () => {
  return (
    <Menu>
      <MenuTrigger>
        <MenuButton>This is a Menu Button</MenuButton>
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
