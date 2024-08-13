import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink } from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - MenuItemLinks',

  decorators: [
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps().hover('[role="menuitem"]').snapshot('hover menuitemlink').end(),
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
        <MenuItemLink href="#" icon={<CutRegular />}>
          Cut
        </MenuItemLink>
        <MenuItemLink href="#" icon={<EditRegular />}>
          Edit
        </MenuItemLink>
        <MenuItemLink href="#" icon={<ClipboardPasteRegular />}>
          Paste
        </MenuItemLink>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';
