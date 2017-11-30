import * as React from 'react';
import { CalendarMonthBase } from './CalendarMonth.base';
import { getStyles } from './CalendarMonth.styles';
import { ICalendarMonthProps } from './CalendarMonth.types';
import { styled } from '../../Utilities';

export const CalendarMonth = styled(
  CalendarMonthBase,
  getStyles
);