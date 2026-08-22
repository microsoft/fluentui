import * as React from 'react';
import { Input, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { InputVrScene } from './InputVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InputWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <InputVrScene Input={Input} Icon={CalendarMonth} />
  </ThemeProvider>
);
