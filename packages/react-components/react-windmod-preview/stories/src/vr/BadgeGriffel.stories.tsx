import * as React from 'react';
import { Badge, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { BadgeVrScene } from './BadgeVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BadgeGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <BadgeVrScene Badge={Badge} Icon={CalendarMonth} />
  </FluentProvider>
);
