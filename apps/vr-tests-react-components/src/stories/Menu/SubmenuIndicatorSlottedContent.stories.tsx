import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

// this places text in the submenuIndicator slot to verify alignment when not using v9 icons
export default {
  title: 'Menu Converged - submenuIndicator slotted content',

  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().click('#nestedTrigger1').click('#nestedTrigger2').snapshot('submenus open').end(),
      }),
  ],
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <Menu>
          <MenuTrigger>
            <MenuItem id="nestedTrigger1" submenuIndicator={<span>N</span>}>
              New
            </MenuItem>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem>File </MenuItem>
              <MenuItem>Folder</MenuItem>
              <Menu>
                <MenuTrigger>
                  <MenuItem id="nestedTrigger2" submenuIndicator={<span>P</span>}>
                    Project
                  </MenuItem>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    <MenuItem>Financial</MenuItem>
                    <MenuItem>Planning</MenuItem>
                    <MenuItem>Status</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
