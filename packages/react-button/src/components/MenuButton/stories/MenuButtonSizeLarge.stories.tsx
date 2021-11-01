import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuButton } from '@fluentui/react-components';
/* eslint-enable @typescript-eslint/ban-ts-comment */
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
          <MenuButton icon={<CalendarMonth24Regular />} size="large">
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
