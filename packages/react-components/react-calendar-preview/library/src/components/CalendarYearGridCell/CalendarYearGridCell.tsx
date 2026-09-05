'use client';

import { useCalendarYearGridCell_unstable } from './useCalendarYearGridCell';
import { useCalendarYearGridCellStyles_unstable } from './useCalendarYearGridCellStyles.styles';
import { renderCalendarYearGridCell_unstable } from './renderCalendarYearGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';

/**
 * A single year in the year picker grid.
 */
export const CalendarYearGridCell = (props: CalendarYearGridCellProps): JSXElement => {
  const state = useCalendarYearGridCell_unstable(props);

  useCalendarYearGridCellStyles_unstable(state);

  return renderCalendarYearGridCell_unstable(state);
};

CalendarYearGridCell.displayName = 'CalendarYearGridCell';
