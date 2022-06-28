import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover, MenuProps } from '@fluentui/react-menu';
import { useIsSSR, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import { Button } from '@fluentui/react-button';

export const SSRDefaultOpen = (props: Partial<MenuProps>) => {
  const [open, setOpen] = React.useState(false);
  const isSSR = useIsSSR();
  useIsomorphicLayoutEffect(() => {
    if (!isSSR) {
      setOpen(true);
    }
  }, [isSSR]);

  return (
    <Menu open={open} onOpenChange={(e, data) => setOpen(data.open)}>
      <MenuTrigger>
        <Button>SSR Default open</Button>
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
};
