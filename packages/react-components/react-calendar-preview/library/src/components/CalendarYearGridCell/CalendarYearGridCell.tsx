'use client';

import * as React from 'react';
import { useCalendarYearGridCell_unstable } from './useCalendarYearGridCell';
import { useCalendarYearGridCellStyles_unstable } from './useCalendarYearGridCellStyles.styles';
import { renderCalendarYearGridCell_unstable } from './renderCalendarYearGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';

/**
 * A single year in the year picker grid.
 */
export const CalendarYearGridCell: ForwardRefComponent<CalendarYearGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarYearGridCell_unstable(props, ref);

  useCalendarYearGridCellStyles_unstable(state);

  return renderCalendarYearGridCell_unstable(state);
});

CalendarYearGridCell.displayName = 'CalendarYearGridCell';
