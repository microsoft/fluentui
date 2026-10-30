'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCalendar } from './useCalendar';
import { useCalendarContextValues } from './calendarContext';
import { renderCalendar } from './renderCalendar';
import type { CalendarProps } from './Calendar.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Calendar shows a date grid and lets the user pick a date, a week, a work week or a month.
 */
export const Calendar: ForwardRefComponent<CalendarProps> = /*#__PURE__*/ composeComponent(
  'Calendar',
  useCalendar,
  renderCalendar,
  useCalendarContextValues,
);
