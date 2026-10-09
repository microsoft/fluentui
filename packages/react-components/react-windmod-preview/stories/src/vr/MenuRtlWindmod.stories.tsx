import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview/menu';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';

import { MenuVrScene } from './MenuVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Ten surfaces are pinned open at once, and popover="auto" is mutually exclusive across a page.
const popoverProps = { popover: 'manual' };

/** The same eight cells at page-level RTL — see MenuVrScene usePageDirection for why a scene is
 * single-direction. This band adjudicates the mirrored chevron (R4/G7). */
export const MenuRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <MenuVrScene
      Menu={Menu as never}
      MenuTrigger={MenuTrigger as never}
      MenuPopover={MenuPopover as never}
      MenuList={MenuList as never}
      MenuItem={MenuItem as never}
      MenuItemCheckbox={MenuItemCheckbox as never}
      MenuItemRadio={MenuItemRadio as never}
      MenuGroup={MenuGroup as never}
      MenuGroupHeader={MenuGroupHeader as never}
      MenuDivider={MenuDivider as never}
      Button={Button}
      Icon={CalendarMonth}
      popoverProps={popoverProps}
      dir="rtl"
    />
  </FluentProvider>
);
