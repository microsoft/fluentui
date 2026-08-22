import * as React from 'react';
import { CompoundButton, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { CompoundButtonVrScene } from './CompoundButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const CompoundButtonWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <CompoundButtonVrScene CompoundButton={CompoundButton} Icon={CalendarMonth} />
  </ThemeProvider>
);
