import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuGroup, MenuDivider, MenuGroupHeader, MenuPopover } from '../index';

import { Button } from '@fluentui/react-button';
import {
  CutRegular as CutIcon,
  ClipboardPasteRegular as PasteIcon,
  EditRegular as EditIcon,
} from '@fluentui/react-icons';

export const GrouppingItems = () => (
  <Menu>
    <MenuTrigger>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutIcon />}>Cut</MenuItem>
          <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
          <MenuItem icon={<EditIcon />}>Edit</MenuItem>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);

GrouppingItems.parameters = {
  docs: {
    description: {
      story: [
        'A menu can be divided in to separate groups, using the `MenuGroup` and `MenuGroupHeader`',
        'components. This ensures the correct accessible markup is rendered for screen reader users.',
      ].join('\n'),
    },
  },
};
