import * as React from 'react';
import { getStyles } from './CalendarYear.styles';
import { styled } from '../../../Utilities';
import { CalendarYearBase } from './CalendarYear.base';
import type { ICalendarYearProps } from './CalendarYear.types';

export const CalendarYear: React.FunctionComponent<ICalendarYearProps> = styled(
  CalendarYearBase,
  getStyles,
  undefined,
  { scope: 'CalendarYear' },
);
