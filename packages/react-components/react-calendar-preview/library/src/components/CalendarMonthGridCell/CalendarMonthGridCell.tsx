'use client';

import { useCalendarMonthGridCell_unstable } from './useCalendarMonthGridCell';
import { useCalendarMonthGridCellStyles_unstable } from './useCalendarMonthGridCellStyles.styles';
import { renderCalendarMonthGridCell_unstable } from './renderCalendarMonthGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';

/**
 * A single month in the month picker grid.
 */
export const CalendarMonthGridCell = (props: CalendarMonthGridCellProps): JSXElement => {
  const state = useCalendarMonthGridCell_unstable(props);

  useCalendarMonthGridCellStyles_unstable(state);

  return renderCalendarMonthGridCell_unstable(state);
};

CalendarMonthGridCell.displayName = 'CalendarMonthGridCell';
