import * as React from 'react';
import { FluentProvider, Select } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { SelectVrScene } from './SelectVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SelectWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SelectVrScene Select={Select} Icon={CalendarMonth} />
  </FluentProvider>
);
