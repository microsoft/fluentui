import * as React from 'react';
import { CompoundButton } from '@fluentui/react-windmod-preview/compound-button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { CompoundButtonVrScene } from './CompoundButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const CompoundButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <CompoundButtonVrScene CompoundButton={CompoundButton} Icon={CalendarMonth} />
  </FluentProvider>
);
