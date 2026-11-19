import * as React from 'react';
import { FluentProvider, Select, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { SelectVrScene } from './SelectVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SelectGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SelectVrScene Select={Select} Icon={CalendarMonth} />
  </FluentProvider>
);
