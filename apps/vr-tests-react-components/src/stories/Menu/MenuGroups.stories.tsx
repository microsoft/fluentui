import * as React from 'react';
import type { Meta } from '@storybook/react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
} from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';

export default {
  title: 'Menu Converged - groups',
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutRegular />}>Cut</MenuItem>
          <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
          <MenuItem icon={<EditRegular />}>Edit</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Section header</MenuGroupHeader>
          <MenuItem icon={<CutRegular />}>Cut</MenuItem>
          <MenuItem icon={<ClipboardPasteRegular />}>Paste</MenuItem>
          <MenuItem icon={<EditRegular />}>Edit</MenuItem>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
