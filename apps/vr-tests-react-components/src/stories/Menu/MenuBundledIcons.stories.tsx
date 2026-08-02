import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-menu';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { getStoryVariant, RTL } from '../../utilities';
import type { StoryParameters } from 'storywright';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'Menu Converged - bundled icon swap',
  parameters: {
    storyWright: { steps: new Steps().snapshot('default').hover('.mouse-target').snapshot('hover menuitem').end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Menu>;

/*
 * S-J state-matrix stories (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * MenuItem's bundled-icon rules fire on root `:hover` (swap TO filled), on `submenuOpen`
 * (covered by `Menu Converged - nested submenus`.`all open` via the default submenu
 * chevron, itself a `bundleIcon()` pair), and on `disabled` `:hover` (swap-BACK to
 * regular — the arg #4 block that must keep beating the arg #2 hover swap on file
 * position). The existing `icon slotted content` stories use plain `<span>` icons, so
 * neither hover rule had bundled-icon pixel evidence.
 */
export const Default = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem className="mouse-target" icon={<CalendarMonth />} secondaryContent="Ctrl+X">
          Cut
        </MenuItem>
        <MenuItem icon={<CalendarMonth />} secondaryContent="Ctrl+C">
          Copy
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
Default.storyName = 'default';

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DisabledHover = () => (
  <Menu open>
    <MenuTrigger>
      <button>Toggle menu</button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem className="mouse-target" disabled icon={<CalendarMonth />} secondaryContent="Ctrl+X">
          Cut
        </MenuItem>
        <MenuItem icon={<CalendarMonth />} secondaryContent="Ctrl+C">
          Copy
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
DisabledHover.storyName = 'disabled swap-back';
