import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-components';

import { Scenario } from './utils';

export const MenuWithSplitItem: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Menu with split item">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>More actions</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Create Folder</MenuItem>
            <Menu>
              <MenuSplitGroup>
                <MenuItem>Open</MenuItem>
                <MenuTrigger disableButtonEnhancement>
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
