import * as React from 'react';

import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-modern-components-preview/menu';
import { Button } from '@fluentui/react-components';

export const MotionCustom = (): React.ReactNode => (
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

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'Modern Menu does not expose the stable `surfaceMotion` slot. It renders its surface behavior directly, without Menu-level custom presence motion.',
    },
  },
};
