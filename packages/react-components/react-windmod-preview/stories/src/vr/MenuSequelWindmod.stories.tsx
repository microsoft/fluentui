import * as React from 'react';
import {
  Button,
  FluentProvider,
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemCheckbox,
  MenuItemLink,
  MenuItemSwitch,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-windmod-preview';
import { bundleIcon } from '@fluentui/react-icons/headless';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';

import { MenuSequelVrScene } from './MenuSequelVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Every surface is pinned open at once, and popover="auto" is mutually exclusive across a page.
const popoverProps = { popover: 'manual' };

export const MenuSequelWindmod = (): React.ReactNode => (
  <FluentProvider dir="ltr">
    <MenuSequelVrScene
      Menu={Menu as never}
      MenuTrigger={MenuTrigger as never}
      MenuPopover={MenuPopover as never}
      MenuList={MenuList as never}
      MenuItem={MenuItem as never}
      MenuItemCheckbox={MenuItemCheckbox as never}
      MenuItemLink={MenuItemLink as never}
      MenuItemSwitch={MenuItemSwitch as never}
      MenuSplitGroup={MenuSplitGroup as never}
      MenuDivider={MenuDivider as never}
      Button={Button}
      Icon={CalendarMonth}
      popoverProps={popoverProps}
      dir="ltr"
    />
  </FluentProvider>
);
