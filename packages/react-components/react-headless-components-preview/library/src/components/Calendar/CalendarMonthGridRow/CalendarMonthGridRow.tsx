'use client';

import { useCalendarMonthGridRow } from './useCalendarMonthGridRow';
import { renderCalendarMonthGridRow } from './renderCalendarMonthGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridRowProps } from './CalendarMonthGridRow.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarMonthGridRow renders one row of the month picker grid.
 */
export const CalendarMonthGridRow: ForwardRefComponent<CalendarMonthGridRowProps> = /*#__PURE__*/ composeComponent(
  'CalendarMonthGridRow',
  useCalendarMonthGridRow,
  renderCalendarMonthGridRow,
);
