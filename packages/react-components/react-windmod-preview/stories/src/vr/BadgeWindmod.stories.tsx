import * as React from 'react';
import { Badge } from '@fluentui/react-windmod-preview/badge';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { BadgeVrScene } from './BadgeVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BadgeWindmod = (): React.ReactNode => (
  <FluentProvider>
    <BadgeVrScene Badge={Badge} Icon={CalendarMonth} />
  </FluentProvider>
);
