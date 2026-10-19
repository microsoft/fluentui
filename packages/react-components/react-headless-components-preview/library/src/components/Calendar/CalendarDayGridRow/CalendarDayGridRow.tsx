'use client';

import { useCalendarDayGridRow } from './useCalendarDayGridRow';
import { renderCalendarDayGridRow } from './renderCalendarDayGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridRowProps } from './CalendarDayGridRow.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDayGridRow renders one week of the day grid.
 */
export const CalendarDayGridRow: ForwardRefComponent<CalendarDayGridRowProps> = /*#__PURE__*/ composeComponent(
  'CalendarDayGridRow',
  useCalendarDayGridRow,
  renderCalendarDayGridRow,
);
