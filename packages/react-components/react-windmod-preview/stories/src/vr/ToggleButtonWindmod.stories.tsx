import * as React from 'react';
import { ThemeProvider, ToggleButton } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { ToggleButtonVrScene } from './ToggleButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ToggleButtonWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <ToggleButtonVrScene ToggleButton={ToggleButton} Icon={CalendarMonth} />
  </ThemeProvider>
);
