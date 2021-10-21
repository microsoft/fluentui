import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
// @ts-ignore
import type { MenuProps } from '@fluentui/react-menu';
/* eslint-enable @typescript-eslint/ban-ts-comment */

import { MenuButton } from './MenuButton';

export const Default = (): JSX.Element => (
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

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
};
