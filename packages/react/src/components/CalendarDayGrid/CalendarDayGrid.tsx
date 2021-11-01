import * as React from 'react';
import { CalendarDayGridBase } from './CalendarDayGrid.base';
import { styles } from './CalendarDayGrid.styles';
import { styled } from '../../Utilities';
import type { ICalendarDayGridProps } from './CalendarDayGrid.types';

export const CalendarDayGrid: React.FunctionComponent<ICalendarDayGridProps> = styled(
  CalendarDayGridBase,
  styles,
  undefined,
  { scope: 'CalendarDayGrid' },
);
