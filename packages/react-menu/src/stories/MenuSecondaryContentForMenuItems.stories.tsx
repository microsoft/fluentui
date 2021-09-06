import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

export const SecondaryContentForMenuItems = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem secondaryContent="Ctrl+N">New File</MenuItem>
        <MenuItem secondaryContent="Ctrl+Shift+N">New Window</MenuItem>
        <MenuItem secondaryContent="Ctrl+O">Open File</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
