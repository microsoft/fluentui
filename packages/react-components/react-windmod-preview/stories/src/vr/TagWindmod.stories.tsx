import * as React from 'react';
import { Avatar, FluentProvider, Tag } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { TagVrScene } from './TagVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const TagWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TagVrScene Tag={Tag} Avatar={Avatar} Icon={CalendarMonth} />
  </FluentProvider>
);
