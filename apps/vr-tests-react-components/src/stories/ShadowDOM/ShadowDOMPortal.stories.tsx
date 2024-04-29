import { Button } from '@fluentui/react-button';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';
import * as React from 'react';

import { ShadowRoot } from './utils';
import { Steps, StoryWright } from 'storywright';

export const Portal: React.FC = () => (
  <StoryWright steps={new Steps().click('#toggle-menu').snapshot('normal', { cropTo: '.testWrapper' }).end()}>
    <ShadowRoot>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button id="toggle-menu">Toggle menu</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New</MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </ShadowRoot>
  </StoryWright>
);
