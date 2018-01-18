import * as React from 'react';
import { styled } from '../../Utilities';
import { ICalendarDayProps } from './CalendarDay.types';
import { CalendarDayBase } from './CalendarDay.base';
import { getStyles } from './CalendarDay.styles';

export const CalendarDay = styled(
  CalendarDayBase,
  getStyles
);