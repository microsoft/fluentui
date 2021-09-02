import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from './index';

import { Button } from './utils.stories';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
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
