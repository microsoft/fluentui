import * as React from 'react';
import { Button, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { ButtonVrScene } from './ButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ButtonWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <ButtonVrScene Button={Button} Icon={CalendarMonth} />
  </ThemeProvider>
);
