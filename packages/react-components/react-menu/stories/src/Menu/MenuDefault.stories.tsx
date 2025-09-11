import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';

export const Default = (): JSXElement => (
  <Menu positioning={{ autoSize: true }}>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

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
