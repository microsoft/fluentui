import * as React from 'react';

import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuProps,
  useIsSSR,
  Button,
} from '@fluentui/react-components';

export const DefaultOpen = (props: Partial<MenuProps>) => {
  const [open, setOpen] = React.useState(false);
  const isSSR = useIsSSR();
  React.useEffect(() => {
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
