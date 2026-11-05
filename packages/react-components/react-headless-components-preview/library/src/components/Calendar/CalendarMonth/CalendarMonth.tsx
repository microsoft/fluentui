'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCalendarMonth } from './useCalendarMonth';
import { renderCalendarMonth } from './renderCalendarMonth';
import type { CalendarMonthProps } from './CalendarMonth.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarMonth shows the months of the navigated year, and opens the year picker from its header.
 */
export const CalendarMonth: ForwardRefComponent<CalendarMonthProps> = /*#__PURE__*/ composeComponent(
  'CalendarMonth',
  useCalendarMonth,
  renderCalendarMonth,
);
