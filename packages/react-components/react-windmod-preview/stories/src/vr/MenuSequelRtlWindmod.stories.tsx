import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuDivider,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemSwitch,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';

import { MenuSequelVrScene } from './MenuSequelVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Every surface is pinned open at once, and popover="auto" is mutually exclusive across a page.
const popoverProps = { popover: 'manual' };

/** The same cells at page-level RTL — see menuSurfaceHarness usePageDirection for why a scene is
 * single-direction. This band adjudicates the switch thumb's explicit RTL negation and the
 * indicator's logical inline-end margin. */
export const MenuSequelRtlWindmod = (): React.ReactNode => (
  <FluentProvider dir="rtl">
    <MenuSequelVrScene
      Menu={Menu as never}
      MenuTrigger={MenuTrigger as never}
      MenuPopover={MenuPopover as never}
      MenuList={MenuList as never}
      MenuItemCheckbox={MenuItemCheckbox as never}
      MenuItemLink={MenuItemLink as never}
      MenuItemSwitch={MenuItemSwitch as never}
      MenuDivider={MenuDivider as never}
      Button={Button}
      Icon={CalendarMonth}
      popoverProps={popoverProps}
      dir="rtl"
    />
  </FluentProvider>
);
