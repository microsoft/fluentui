import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../index';
import { Tooltip } from '@fluentui/react-tooltip';

import { Button } from '@fluentui/react-button';

export const MenuTriggerWithTooltip = () => (
  <Menu>
    <Tooltip content="This is a tooltip">
      <MenuTrigger>
        <Button onBlur={() => null} onClick={() => null}>
          Toggle menu
        </Button>
      </MenuTrigger>
    </Tooltip>

    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
