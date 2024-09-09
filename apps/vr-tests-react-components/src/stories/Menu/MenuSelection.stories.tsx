import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemCheckbox, MenuItemSwitch } from '@fluentui/react-menu';
import { CutRegular, EditRegular, ClipboardPasteRegular } from '@fluentui/react-icons';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'Menu Converged - selection',

  decorators: [
    story =>
      withStoryWrightSteps({ story, steps: new Steps().click('[role="menuitemcheckbox"]').snapshot('selected').end() }),
  ],
} satisfies Meta<typeof Menu>;

export const Checkbox = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItemCheckbox icon={<CutRegular />} name="edit" value="cut">
          Cut
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<ClipboardPasteRegular />} name="edit" value="paste">
          Paste
        </MenuItemCheckbox>
        <MenuItemCheckbox icon={<EditRegular />} name="edit" value="edit">
          Edit
        </MenuItemCheckbox>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Checkbox.storyName = 'checkbox';

export const CheckboxRTL = getStoryVariant(Checkbox, RTL);

export const CheckboxHighContrast = getStoryVariant(Checkbox, HIGH_CONTRAST);

export const CheckboxDarkMode = getStoryVariant(Checkbox, DARK_MODE);

export const Switch = () => (
  <Menu open checkedValues={{ demo: ['checked'] }}>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItemSwitch icon={<CutRegular />} name="demo" value="unchecked">
          Unchecked
        </MenuItemSwitch>
        <MenuItemSwitch icon={<ClipboardPasteRegular />} name="demo" value="checked">
          Checked
        </MenuItemSwitch>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Switch.storyName = 'switch';

export const SwitchRTL = getStoryVariant(Switch, RTL);

export const SwitchHighContrast = getStoryVariant(Switch, HIGH_CONTRAST);

export const SwitchDarkMode = getStoryVariant(Switch, DARK_MODE);
