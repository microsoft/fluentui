import * as React from 'react';
import { FluentProvider, Tab, TabList, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { TabListVrScene } from './TabListVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const TabListGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TabListVrScene TabList={TabList} Tab={Tab} CalendarIcon={CalendarMonth} />
  </FluentProvider>
);
