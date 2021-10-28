import * as React from 'react';
import { CalendarMonth24Regular, Filter24Regular } from '@fluentui/react-icons';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, MenuProps, MenuButton } from '@fluentui/react-components';
/* eslint-enable @typescript-eslint/ban-ts-comment */

export const Icon = () => (
  <>
    <Menu>
      <MenuTrigger>
        <MenuButton icon={<CalendarMonth24Regular />}>This is a Menu Button</MenuButton>
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
        <MenuButton icon={<CalendarMonth24Regular />} menuIcon={<Filter24Regular />}>
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
        <MenuButton icon={<CalendarMonth24Regular />} />
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
Icon.parameters = {
  docs: {
    description: {
      story:
        'MenuButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.',
    },
  },
};
