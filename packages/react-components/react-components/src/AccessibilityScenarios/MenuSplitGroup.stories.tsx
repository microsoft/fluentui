import * as React from 'react';

import { MenuButton } from '@fluentui/react-button';
import { Menu, MenuTrigger, MenuList, MenuPopover, MenuItem, MenuSplitGroup } from '@fluentui/react-menu';

import { Scenario } from './utils';

export const MenuWithSplitItemAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Menu with split item">
      <Menu>
        <MenuTrigger>
          <MenuButton>More actions</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Create Folder</MenuItem>
            <Menu>
              <MenuSplitGroup>
                <MenuItem>Open</MenuItem>
                <MenuTrigger>
                  <MenuItem id="nestedTrigger" aria-label="More open options" />
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
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Menu with split item',
  id: 'menu-splitgroup-accessibility-scenario',
};
