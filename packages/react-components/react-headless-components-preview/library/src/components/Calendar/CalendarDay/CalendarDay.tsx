'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCalendarDay } from './useCalendarDay';
import { renderCalendarDay } from './renderCalendarDay';
import type { CalendarDayProps } from './CalendarDay.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDay shows a month header with navigation, above the grid of that month's days.
 */
export const CalendarDay: ForwardRefComponent<CalendarDayProps> = /*#__PURE__*/ composeComponent(
  'CalendarDay',
  useCalendarDay,
  renderCalendarDay,
);
