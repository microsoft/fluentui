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
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { MenuSequelVrScene } from './MenuSequelVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Griffel portals each surface to its own node, so nothing needs pinning.
const popoverProps = {};

export const MenuSequelGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="ltr">
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
      dir="ltr"
    />
  </FluentProvider>
);
