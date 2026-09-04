import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { SplitButton } from '@fluentui/react-windmod-preview/split-button';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { SplitButtonVrScene } from './SplitButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

// Griffel picks its rtl atoms from FluentProvider context, so the RTL band needs a real
// provider on each side rather than a bare dir="rtl" element.
const Rtl = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <FluentProvider dir="rtl">{children}</FluentProvider>
);

export const SplitButtonWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SplitButtonVrScene SplitButton={SplitButton} Icon={CalendarMonth} Rtl={Rtl} />
  </FluentProvider>
);
