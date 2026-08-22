import * as React from 'react';
import { FluentProvider, Input, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { InputVrScene } from './InputVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InputGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <InputVrScene Input={Input} Icon={CalendarMonth} />
  </FluentProvider>
);
