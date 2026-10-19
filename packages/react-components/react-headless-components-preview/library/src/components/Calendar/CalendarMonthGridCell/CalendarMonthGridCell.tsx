'use client';

import { useCalendarMonthGridCell } from './useCalendarMonthGridCell';
import { renderCalendarMonthGridCell } from './renderCalendarMonthGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridCellProps } from './CalendarMonthGridCell.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarMonthGridCell renders a single month in the grid.
 */
export const CalendarMonthGridCell: ForwardRefComponent<CalendarMonthGridCellProps> = /*#__PURE__*/ composeComponent(
  'CalendarMonthGridCell',
  useCalendarMonthGridCell,
  renderCalendarMonthGridCell,
);
