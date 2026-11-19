import * as React from 'react';
import { CompoundButton, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { CompoundButtonVrScene } from './CompoundButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const CompoundButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <CompoundButtonVrScene CompoundButton={CompoundButton} Icon={CalendarMonth} />
  </FluentProvider>
);
