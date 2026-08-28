import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Select } from '@fluentui/react-windmod-preview/select';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { SelectVrScene } from './SelectVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SelectWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SelectVrScene Select={Select} Icon={CalendarMonth} />
  </FluentProvider>
);
