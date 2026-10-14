'use client';

import * as React from 'react';
import { useCalendarMonthGridCell } from './useCalendarMonthGridCell';
import { renderCalendarMonthGridCell } from './renderCalendarMonthGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';

/**
 * CalendarMonthGridCell renders a single month in the grid.
 */
export const CalendarMonthGridCell: ForwardRefComponent<CalendarMonthGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarMonthGridCell(props, ref);

  return renderCalendarMonthGridCell(state);
});

CalendarMonthGridCell.displayName = 'CalendarMonthGridCell';
