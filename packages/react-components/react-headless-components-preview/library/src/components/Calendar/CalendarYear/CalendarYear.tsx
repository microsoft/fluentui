'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCalendarYear } from './useCalendarYear';
import { renderCalendarYear } from './renderCalendarYear';
import type { CalendarYearProps } from './CalendarYear.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarYear shows a range of years and lets the user pick one.
 */
export const CalendarYear: ForwardRefComponent<CalendarYearProps> = /*#__PURE__*/ composeComponent(
  'CalendarYear',
  useCalendarYear,
  renderCalendarYear,
);
