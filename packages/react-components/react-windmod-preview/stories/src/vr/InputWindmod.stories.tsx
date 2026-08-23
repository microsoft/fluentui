import * as React from 'react';
import { FluentProvider, Input } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { InputVrScene } from './InputVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const InputWindmod = (): React.ReactNode => (
  <FluentProvider>
    <InputVrScene Input={Input} Icon={CalendarMonth} />
  </FluentProvider>
);
