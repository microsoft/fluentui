import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuButton } from '@fluentui/react-components';
/* eslint-enable @typescript-eslint/ban-ts-comment */
export const SizeMedium = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton size="medium">This is a Menu Button</MenuButton>
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
          <MenuButton icon={<CalendarMonth24Regular />} size="medium">
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
          <MenuButton size="medium" />
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

SizeMedium.storyName = 'Size: medium';
