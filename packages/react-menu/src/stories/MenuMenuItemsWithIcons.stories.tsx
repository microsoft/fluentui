import * as React from 'react';

import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../index';

import { Button } from '@fluentui/react-button';
import {
  CutRegular as CutIcon,
  ClipboardPasteRegular as PasteIcon,
  EditRegular as EditIcon,
} from '@fluentui/react-icons';

export const MenuItemsWithIcons = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem icon={<CutIcon />}>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem icon={<EditIcon />}>Edit</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
