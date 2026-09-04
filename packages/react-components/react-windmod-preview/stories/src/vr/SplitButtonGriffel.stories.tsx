import * as React from 'react';
import { FluentProvider, SplitButton, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { SplitButtonVrScene } from './SplitButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const Rtl = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    {children}
  </FluentProvider>
);

export const SplitButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SplitButtonVrScene SplitButton={SplitButton} Icon={CalendarMonth} Rtl={Rtl} />
  </FluentProvider>
);
