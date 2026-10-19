'use client';

import { useCalendarYearGridCell } from './useCalendarYearGridCell';
import { renderCalendarYearGridCell } from './renderCalendarYearGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridCellProps } from './CalendarYearGridCell.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarYearGridCell renders a single year in the grid.
 */
export const CalendarYearGridCell: ForwardRefComponent<CalendarYearGridCellProps> = /*#__PURE__*/ composeComponent(
  'CalendarYearGridCell',
  useCalendarYearGridCell,
  renderCalendarYearGridCell,
);
