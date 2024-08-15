import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - secondary content',

  decorators: [
    story =>
      withStoryWrightSteps({ story, steps: new Steps().hover('[role="menuitem"]').snapshot('hover menuitem').end() }),
  ],
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem icon={<CutRegular />} secondaryContent="Ctrl+X">
          Cut
        </MenuItem>
        <MenuItem icon={<EditRegular />}>Edit</MenuItem>
        <MenuItem icon={<ClipboardPasteRegular />} secondaryContent="Ctrl+P">
          Paste
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
