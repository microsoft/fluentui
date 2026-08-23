import * as React from 'react';
import { Button, FluentProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { ButtonVrScene } from './ButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ButtonVrScene Button={Button} Icon={CalendarMonth} />
  </FluentProvider>
);
