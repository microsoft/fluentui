import * as React from 'react';

import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  useIsSSR,
  Button,
  Checkbox,
} from '@fluentui/react-components';

export const SSRDefaultOpen = () => {
  const [mounted, setMounted] = React.useState(false);

  return (
    <>
      <Checkbox label="Mount component" checked={mounted} onChange={(e, data) => setMounted(data.checked as boolean)} />
      {mounted && <DefaultOpenMenu />}
    </>
  );
};

const DefaultOpenMenu = () => {
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
