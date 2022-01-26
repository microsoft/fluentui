import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { CalendarBase } from './Calendar.base';
import { styles } from './Calendar.styles';
import type { ICalendarProps } from './Calendar.types';

export const Calendar: React.FunctionComponent<ICalendarProps> = styled(CalendarBase, styles, undefined, {
  scope: 'Calendar',
});
