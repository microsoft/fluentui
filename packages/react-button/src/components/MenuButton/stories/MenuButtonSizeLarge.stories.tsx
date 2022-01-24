import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { MenuButton } from '../../../MenuButton';

export const SizeLarge = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton size="large">This is a Menu Button</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu>
        <MenuTrigger>
          <MenuButton icon={<CalendarMonthRegular />} size="large">
            This is a Menu Button
          </MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>

      <Menu>
        <MenuTrigger>
          <MenuButton size="large" />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>Item a</MenuItem>
            <MenuItem>Item b</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

SizeLarge.storyName = 'Size: large';
