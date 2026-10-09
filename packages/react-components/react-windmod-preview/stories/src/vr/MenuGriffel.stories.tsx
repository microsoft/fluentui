import * as React from 'react';
import {
  Button,
  FluentProvider,
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
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { MenuVrScene } from './MenuVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Griffel portals each surface to its own node, so nothing needs pinning.
const popoverProps = {};

export const MenuGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="ltr">
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
      dir="ltr"
    />
  </FluentProvider>
);
