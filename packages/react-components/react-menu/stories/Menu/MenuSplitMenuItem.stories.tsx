import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuSplitGroup } from '@fluentui/react-components';

export const SplitMenuItem = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <Menu>
          <MenuSplitGroup>
            <MenuItem>Open</MenuItem>
            <MenuTrigger disableButtonEnhancement>
              <MenuItem aria-label="Open on platform" />
            </MenuTrigger>
          </MenuSplitGroup>
          <MenuPopover>
            <MenuList>
              <MenuItem>In browser</MenuItem>
              <MenuItem>In desktop app</MenuItem>
              <MenuItem>In mobile</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
        <MenuItem>Preferences</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

SplitMenuItem.parameters = {
  docs: {
    description: {
      story: [
        'A menu item can be split into a main action and a trigger that opens a submenu.',
        'Use this pattern sparingly. Make sure to add an `aria-label` to the trigger for screen reader users.',
      ].join('\n'),
    },
  },
};
