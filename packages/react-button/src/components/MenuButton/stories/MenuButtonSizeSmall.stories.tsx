import * as React from 'react';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { MenuButton } from '@fluentui/react-button';
/* eslint-enable @typescript-eslint/ban-ts-comment */
export const SizeSmall = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton size="small">This is a Menu Button</MenuButton>
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
          <MenuButton icon={<CalendarMonth24Regular />} size="small">
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
          <MenuButton size="small" />
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

SizeSmall.storyName = 'Size: small';
