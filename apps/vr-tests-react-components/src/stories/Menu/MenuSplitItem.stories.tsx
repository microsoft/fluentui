import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, MenuSplitGroup } from '@fluentui/react-menu';

import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - split item',

  decorators: [
    story => withStoryWrightSteps({ story, steps: new Steps().click('#nestedTrigger').snapshot('submenu open').end() }),
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
          <MenuSplitGroup>
            <MenuItem>Open</MenuItem>
            <MenuTrigger>
              <MenuItem id="nestedTrigger" />
            </MenuTrigger>
          </MenuSplitGroup>

          <MenuPopover>
            <MenuList>
              <MenuItem>In browser</MenuItem>
              <MenuItem>In desktop app</MenuItem>
              <MenuItem>In mobile</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
