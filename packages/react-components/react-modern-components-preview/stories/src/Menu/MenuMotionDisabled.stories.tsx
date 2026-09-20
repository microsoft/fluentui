import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-modern-components-preview/menu';
import { Button } from '@fluentui/react-components';

export const MotionDisabled = (): React.ReactNode => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

MotionDisabled.parameters = {
  docs: {
    description: {
      story:
        'Modern Menu does not expose a surface transition slot, so no motion prop is required to render this menu.',
    },
  },
};
