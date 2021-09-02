import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItemRadio, MenuPopover } from './index';

import { Button } from './utils.stories';
import {
  Cut20Regular as CutIcon,
  ClipboardPaste20Regular as PasteIcon,
  Edit20Regular as EditIcon,
} from '@fluentui/react-icons';

export const RadioItems = () => {
  return (
    <Menu>
      <MenuTrigger>
        <Button>Toggle menu</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItemRadio icon={<CutIcon />} name="font" value="segoe">
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<PasteIcon />} name="font" value="calibri">
            Calibri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditIcon />} name="font" value="arial">
            Arial
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
