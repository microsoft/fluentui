import * as React from 'react';

import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-menu';
import { Tooltip } from '@fluentui/react-tooltip';
import { MenuButton } from '../../../MenuButton';

export const SizeMedium = () => {
  return (
    <>
      <Menu>
        <MenuTrigger>
          <MenuButton size="medium">Medium</MenuButton>
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
          <MenuButton icon={<CalendarMonthRegular />} size="medium">
            Medium with calendar icon
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
          <Tooltip content="Medium with calendar icon only" relationship="label">
            <MenuButton size="medium" />
          </Tooltip>
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
