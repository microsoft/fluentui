import * as React from 'react';

import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  useRestoreFocusTarget,
} from '@fluentui/react-components';

export const Default = () => (
  <Menu openOnContext>
    <MenuTrigger disableButtonEnhancement>
      <Button {...useRestoreFocusTarget()}>Toggle menu</Button>
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
