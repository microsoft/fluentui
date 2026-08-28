import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tab, TabList } from '@fluentui/react-windmod-preview/tab-list';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { TabListVrScene } from './TabListVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const TabListWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TabListVrScene TabList={TabList} Tab={Tab} CalendarIcon={CalendarMonth} />
  </FluentProvider>
);
