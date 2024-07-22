import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';

import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - nested submenus',

  decorators: [
    // https://github.com/microsoft/fluentui/issues/19782
    story => withStoryWrightSteps({ story, steps: new Steps().click('#nestedTrigger').snapshot('all open').end() }),
  ],
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New </MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem>Open Folder</MenuItem>
        <Menu>
          <MenuTrigger>
            <MenuItem id="nestedTrigger">Preferences</MenuItem>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>New </MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuItem>Open Folder</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
