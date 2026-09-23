'use client';

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

export const SSRDefaultOpen = (): React.ReactElement => {
  const [mounted, setMounted] = React.useState(false);
  const handleMount = React.useCallback(
    (_: unknown, data: { checked: boolean | 'mixed' }) => setMounted(data.checked === true),
    [],
  );

  return (
    <>
      <Checkbox label="Mount component" checked={mounted} onChange={handleMount} />
      {mounted && <DefaultOpenMenu />}
    </>
  );
};

const DefaultOpenMenu = () => {
  const [open, setOpen] = React.useState(false);
  const isSSR = useIsSSR();
  React.useEffect(() => {
    if (!isSSR) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Demonstrates opening a portal after hydration.
      setOpen(true);
    }
  }, [isSSR]);
  const handleOpen = React.useCallback((_: unknown, data: { open: boolean }) => setOpen(data.open), []);

  return (
    <Menu open={open} onOpenChange={handleOpen}>
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
