import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { ToggleButton } from '@fluentui/react-windmod-preview/toggle-button';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { ToggleButtonVrScene } from './ToggleButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ToggleButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ToggleButtonVrScene ToggleButton={ToggleButton} Icon={CalendarMonth} />
  </FluentProvider>
);
