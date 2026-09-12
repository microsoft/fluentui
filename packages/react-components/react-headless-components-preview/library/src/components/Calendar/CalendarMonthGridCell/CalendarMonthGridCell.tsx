'use client';

import { useCalendarMonthGridCell } from './useCalendarMonthGridCell';
import { renderCalendarMonthGridCell } from './renderCalendarMonthGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';

/**
 * CalendarMonthGridCell renders a single month in the grid.
 */
export const CalendarMonthGridCell = (props: CalendarMonthGridCellProps): JSXElement => {
  const state = useCalendarMonthGridCell(props);

  return renderCalendarMonthGridCell(state);
};

CalendarMonthGridCell.displayName = 'CalendarMonthGridCell';
