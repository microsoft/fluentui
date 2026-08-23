import * as React from 'react';
import { FluentProvider, MenuButton } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { MenuButtonVrScene } from './MenuButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const MenuButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <MenuButtonVrScene MenuButton={MenuButton} Icon={CalendarMonth} />
  </FluentProvider>
);
