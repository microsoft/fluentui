'use client';

import { useCalendarYearGridCell } from './useCalendarYearGridCell';
import { renderCalendarYearGridCell } from './renderCalendarYearGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';

/**
 * CalendarYearGridCell renders a single year in the grid.
 */
export const CalendarYearGridCell = (props: CalendarYearGridCellProps): JSXElement => {
  const state = useCalendarYearGridCell(props);

  return renderCalendarYearGridCell(state);
};

CalendarYearGridCell.displayName = 'CalendarYearGridCell';
