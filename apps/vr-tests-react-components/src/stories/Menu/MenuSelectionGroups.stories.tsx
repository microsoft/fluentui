import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
} from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { getStoryVariant, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - selection groups',

  decorators: [
    story =>
      withStoryWrightSteps({ story, steps: new Steps().click('[role="menuitemcheckbox"]').snapshot('selected').end() }),
  ],
} satisfies Meta<typeof Menu>;

export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuGroup>
          <MenuGroupHeader>Checkbox group</MenuGroupHeader>
          <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
            Cut
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
            Paste
          </MenuItemCheckbox>
          <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
            Edit
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuGroupHeader>Radio group</MenuGroupHeader>
          <MenuItemRadio icon={<CutRegular />} name="font" value="segoe">
            Segoe
          </MenuItemRadio>
          <MenuItemRadio icon={<ClipboardPasteRegular />} name="font" value="calibri">
            Caliri
          </MenuItemRadio>
          <MenuItemRadio icon={<EditRegular />} name="font" value="arial">
            Arial
          </MenuItemRadio>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);
