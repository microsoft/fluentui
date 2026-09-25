import * as React from 'react';
import { MenuButton } from '@fluentui/react-windmod-preview/menu-button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { MenuButtonVrScene } from './MenuButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const MenuButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <MenuButtonVrScene MenuButton={MenuButton} Icon={CalendarMonth} />
  </FluentProvider>
);
