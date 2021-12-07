import * as React from 'react';

import { useId } from '@fluentui/react-utilities';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../index';

import { Button } from '@fluentui/react-button';

export const AriaOwnsOnVirtualParent = () => {
  const menuId = useId('menu');

  return (
    <>
      <span aria-owns={menuId} />
      <Menu>
        <MenuTrigger>
          <Button>Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList id={menuId}>
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
