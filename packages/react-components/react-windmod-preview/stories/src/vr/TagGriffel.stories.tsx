import * as React from 'react';
import { FluentProvider, Tag, webLightTheme } from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { TagVrScene } from './TagVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const TagGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TagVrScene Tag={Tag} Icon={CalendarMonth} />
  </FluentProvider>
);
