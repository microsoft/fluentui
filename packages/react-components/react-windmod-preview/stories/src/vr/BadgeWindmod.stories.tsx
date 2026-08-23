import * as React from 'react';
import { Badge, FluentProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { BadgeVrScene } from './BadgeVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BadgeWindmod = (): React.ReactNode => (
  <FluentProvider>
    <BadgeVrScene Badge={Badge} Icon={CalendarMonth} />
  </FluentProvider>
);
