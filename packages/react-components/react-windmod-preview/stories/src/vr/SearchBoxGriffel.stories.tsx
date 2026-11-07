import * as React from 'react';
import { FluentProvider, SearchBox, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { SearchBoxVrScene } from './SearchBoxVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SearchBoxGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <SearchBoxVrScene SearchBox={SearchBox} Icon={CalendarMonth} />
  </FluentProvider>
);
