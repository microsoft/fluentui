import * as React from 'react';

import { Button, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-components';

export const Default = () => (
  <>
    <Menu positioning={{ autoSize: true }}>
      <MenuTrigger disableButtonEnhancement>
        <Button>Toggle menu</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
    Eu ea commodo sint fugiat id consequat deserunt mollit laborum ut culpa eiusmod incididunt pariatur. Tempor id sint
    laborum incididunt consequat commodo labore consectetur dolore. Magna in et tempor nostrud consequat ut eiusmod
    dolore velit nulla est commodo ipsum nisi. Aute nostrud tempor ea exercitation non culpa nulla quis et in.
    Adipiscing nostrud eu ut eiusmod non in laborum pariatur cupidatat proident nulla laboris ad consequat deserunt.
    Laborum ea ut aliqua commodo veniam sunt labore proident incididunt. Incididunt ipsum quis nisi esse eu do amet sed
    consequat officia fugiat ex eiusmod.
  </>
);
