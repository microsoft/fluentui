'use client';

import { useCalendarYearGridRow } from './useCalendarYearGridRow';
import { renderCalendarYearGridRow } from './renderCalendarYearGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridRowProps } from './CalendarYearGridRow.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarYearGridRow renders one row of the year picker grid.
 */
export const CalendarYearGridRow: ForwardRefComponent<CalendarYearGridRowProps> = /*#__PURE__*/ composeComponent(
  'CalendarYearGridRow',
  useCalendarYearGridRow,
  renderCalendarYearGridRow,
);
