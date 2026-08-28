import * as React from 'react';
import { Input } from '@fluentui/react-windmod-preview/input';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { InputVrScene } from './InputVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InputWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InputVrScene Input={Input} Icon={CalendarMonth} />
  </FluentProvider>
);
