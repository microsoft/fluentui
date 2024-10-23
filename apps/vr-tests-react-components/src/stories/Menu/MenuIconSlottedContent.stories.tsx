import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';

import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - icon slotted content',

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
        <MenuItem icon={<span>X</span>} secondaryContent="Ctrl+X">
          Cut
        </MenuItem>
        <MenuItem icon={<span>C</span>} secondaryContent="Ctrl+C">
          Copy
        </MenuItem>
        <MenuItem icon={<span>V</span>} secondaryContent="Ctrl+V">
          Paste
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
