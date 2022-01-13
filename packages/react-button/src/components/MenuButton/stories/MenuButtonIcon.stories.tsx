import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { CalendarMonthRegular, FilterRegular } from '@fluentui/react-icons';
import { MenuButton } from '../../../MenuButton';

export const Icon = () => (
  <>
    <Menu>
      <MenuTrigger>
        <MenuButton icon={<CalendarMonthRegular />}>This is a Menu Button</MenuButton>
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
        <MenuButton icon={<CalendarMonthRegular />} menuIcon={<FilterRegular />}>
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
        <MenuButton icon={<CalendarMonthRegular />} />
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
