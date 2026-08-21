import * as React from 'react';
import { Badge, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { BadgeVrScene } from './BadgeVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BadgeWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <BadgeVrScene Badge={Badge} Icon={CalendarMonth} />
  </ThemeProvider>
);
