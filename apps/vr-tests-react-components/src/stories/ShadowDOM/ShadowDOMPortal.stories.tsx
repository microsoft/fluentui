import { Button } from '@fluentui/react-button';
import { Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from '@fluentui/react-menu';
import * as React from 'react';
import type { StoryFn } from '@storybook/react';

import { ShadowRoot } from './utils';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';

export default {
  title: 'Shadow DOM',
  parameters: {
    storyWright: { steps: new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
};

export const Portal: StoryFn = () => (
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
);

Portal.parameters = {
  storyWright: { steps: new Steps().click('#toggle-menu').snapshot('normal').end() },
} satisfies StoryParameters;
