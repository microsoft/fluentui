import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { CalendarMonthRegular, FilterRegular } from '@fluentui/react-icons';
import { SplitButton, MenuButtonProps } from '../../../index';

export const Icon = () => (
  <>
    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton="With icon before contents"
            icon={<CalendarMonthRegular />}
          />
        )}
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton="With icon after contents"
            icon={<CalendarMonthRegular />}
            iconPosition="after"
          />
        )}
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton="With icon and custom menu icon"
            icon={<CalendarMonthRegular />}
            menuIcon={<FilterRegular />}
          />
        )}
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>Item a</MenuItem>
          <MenuItem>Item b</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>

    <Menu positioning="below-end">
      <MenuTrigger>
        {(triggerProps: MenuButtonProps) => (
          <SplitButton
            menuButton={triggerProps}
            primaryActionButton={{ 'aria-label': 'Icon only' }}
            icon={<CalendarMonthRegular />}
          />
        )}
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
        'SplitButton has an `icon` slot that renders before the text, and `menuIcon` slot that renders after the text.',
    },
  },
};
