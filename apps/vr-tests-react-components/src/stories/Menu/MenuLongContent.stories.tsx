import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, MenuDivider } from '@fluentui/react-menu';
import { CutRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { getStoryVariant, RTL } from '../../utilities';

export default {
  title: 'Menu Converged - long content',
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem icon={<CutRegular />}>Cut</MenuItem>
        <MenuDivider />
        <MenuItem icon={<ClipboardPasteRegular />} secondaryContent="Ctrl+P">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Nisl pretium fusce id velit ut tortor.
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
