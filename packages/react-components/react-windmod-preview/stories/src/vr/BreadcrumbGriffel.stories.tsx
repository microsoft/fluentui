import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { BreadcrumbVrScene } from './BreadcrumbVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const BreadcrumbGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
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
