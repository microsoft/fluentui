import * as React from 'react';
import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { ButtonVrScene } from './ButtonVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ButtonGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <ButtonVrScene Button={Button} Icon={CalendarMonth} />
  </FluentProvider>
);
