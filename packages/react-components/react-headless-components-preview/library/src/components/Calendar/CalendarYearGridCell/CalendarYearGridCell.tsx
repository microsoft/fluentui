'use client';

import * as React from 'react';
import { useCalendarYearGridCell } from './useCalendarYearGridCell';
import { renderCalendarYearGridCell } from './renderCalendarYearGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';

/**
 * CalendarYearGridCell renders a single year in the grid.
 */
export const CalendarYearGridCell: ForwardRefComponent<CalendarYearGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarYearGridCell(props, ref);

  return renderCalendarYearGridCell(state);
});

CalendarYearGridCell.displayName = 'CalendarYearGridCell';
