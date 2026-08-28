import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { SearchBox } from '@fluentui/react-windmod-preview/search-box';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { SearchBoxVrScene } from './SearchBoxVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SearchBoxWindmod = (): React.ReactNode => (
  <FluentProvider>
    <SearchBoxVrScene SearchBox={SearchBox} Icon={CalendarMonth} />
  </FluentProvider>
);
