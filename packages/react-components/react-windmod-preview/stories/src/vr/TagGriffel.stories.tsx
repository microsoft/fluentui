import * as React from 'react';
import { Avatar, FluentProvider, Tag, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { TagVrScene } from './TagVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const TagGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TagVrScene Tag={Tag} Avatar={Avatar} Icon={CalendarMonth} />
  </FluentProvider>
);
