'use client';

import * as React from 'react';
import { useCalendarMonthGridCell_unstable } from './useCalendarMonthGridCell';
import { useCalendarMonthGridCellStyles_unstable } from './useCalendarMonthGridCellStyles.styles';
import { renderCalendarMonthGridCell_unstable } from './renderCalendarMonthGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';

/**
 * A single month in the month picker grid.
 */
export const CalendarMonthGridCell: ForwardRefComponent<CalendarMonthGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarMonthGridCell_unstable(props, ref);

  useCalendarMonthGridCellStyles_unstable(state);

  return renderCalendarMonthGridCell_unstable(state);
});

CalendarMonthGridCell.displayName = 'CalendarMonthGridCell';
