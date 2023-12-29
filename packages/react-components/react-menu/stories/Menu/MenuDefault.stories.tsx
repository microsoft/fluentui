import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';

export const Default = () => {
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => setWide(true), 3000);
  }, []);

  return (
    <>
      <div style={{ marginLeft: '200px', display: 'inline-block' }} />
      <Menu positioning="below">
        <MenuTrigger disableButtonEnhancement>
          <Button>Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover style={{ width: wide ? '200px' : undefined }}>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};
