import * as React from 'react';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '../../index';

import { PasteIcon } from '../../tmp-icons.stories';

export const AligningWithIcons = () => (
  <Menu hasIcons hasCheckmarks>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>
    <MenuPopover>
      <MenuList>
        <MenuItem>Cut</MenuItem>
        <MenuItem icon={<PasteIcon />}>Paste</MenuItem>
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

export default {
  title: 'Components/Menu',
  component: Menu,
};
