import * as React from 'react';
import { FluentProvider, ToggleButton, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { ToggleButtonVrScene } from './ToggleButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ToggleButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ToggleButtonVrScene ToggleButton={ToggleButton} Icon={CalendarMonth} />
  </FluentProvider>
);
