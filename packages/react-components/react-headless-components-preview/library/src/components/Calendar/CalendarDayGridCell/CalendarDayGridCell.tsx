'use client';

import { useCalendarDayGridCell } from './useCalendarDayGridCell';
import { renderCalendarDayGridCell } from './renderCalendarDayGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDayGridCell renders a single day in the grid.
 */
export const CalendarDayGridCell: ForwardRefComponent<CalendarDayGridCellProps> = /*#__PURE__*/ composeComponent(
  'CalendarDayGridCell',
  useCalendarDayGridCell,
  renderCalendarDayGridCell,
);
