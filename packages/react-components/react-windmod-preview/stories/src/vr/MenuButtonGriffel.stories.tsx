import * as React from 'react';
import { FluentProvider, MenuButton, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { MenuButtonVrScene } from './MenuButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const MenuButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <MenuButtonVrScene MenuButton={MenuButton} Icon={CalendarMonth} />
  </FluentProvider>
);
