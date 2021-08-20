import * as React from 'react';
import { CalendarMonthBase } from './CalendarMonth.base';
import { getStyles } from './CalendarMonth.styles';
import { styled } from '../../../Utilities';
import type { ICalendarMonthProps } from './CalendarMonth.types';

export const CalendarMonth: React.FunctionComponent<ICalendarMonthProps> = styled(
  CalendarMonthBase,
  getStyles,
  undefined,
  { scope: 'CalendarMonth' },
);
