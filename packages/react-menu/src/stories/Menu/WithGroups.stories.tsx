import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuGroupHeader,
  MenuPopover,
} from '../../index';

import { CutIcon, PasteIcon, EditIcon } from '../../tmp-icons.stories';

export const WithGroups = () => (
  <Menu>
    <MenuTrigger>
      <button>Toggle menu</button>
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

export default {
  title: 'Components/Menu',
  component: Menu,
};
