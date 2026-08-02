import * as React from 'react';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { Menu, MenuTrigger, MenuPopover } from '@fluentui/react-menu';
import { MenuGrid, MenuGridItem } from '@fluentui/react-menu-grid-preview';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export default {
  title: 'MenuGrid Converged',

  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default').hover('.mouse-target').snapshot('hover row').end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof MenuGrid>;

/*
 * S-J state-matrix story (migration/griffel-to-tailwind/reports/griffel-zero-plan.md §2.2):
 * MenuGridRow's single bundled-icon rule fires on row `:hover` (filled shown, regular
 * hidden). The package's default stories wrap their glyphs in transparent Buttons and use
 * single-variant icons, so the swap had no pixel evidence — this story puts a bare
 * `bundleIcon()` pair in the icon slot and hovers the row.
 */
export const Default = () => (
  <Menu open>
    <MenuTrigger disableButtonEnhancement>
      <button>Chat participants</button>
    </MenuTrigger>
    <MenuPopover>
      <MenuGrid>
        <MenuGridItem className="mouse-target" aria-label="Olivia Carter" icon={<CalendarMonth />}>
          Olivia Carter
        </MenuGridItem>
        <MenuGridItem aria-label="Liam Thompson" icon={<CalendarMonth />}>
          Liam Thompson
        </MenuGridItem>
      </MenuGrid>
    </MenuPopover>
  </Menu>
);

Default.storyName = 'bundled icon swap';

export const DefaultRTL = getStoryVariant(Default, RTL);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);

export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
