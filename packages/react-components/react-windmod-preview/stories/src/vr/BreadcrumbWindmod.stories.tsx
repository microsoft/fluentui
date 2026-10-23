import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
} from '@fluentui/react-windmod-preview/breadcrumb';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { BreadcrumbVrScene } from './BreadcrumbVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BreadcrumbWindmod = (): React.ReactNode => (
  <FluentProvider>
    <BreadcrumbVrScene
      Breadcrumb={Breadcrumb}
      BreadcrumbItem={BreadcrumbItem}
      BreadcrumbDivider={BreadcrumbDivider}
      BreadcrumbButton={BreadcrumbButton}
      Provider={FluentProvider}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
