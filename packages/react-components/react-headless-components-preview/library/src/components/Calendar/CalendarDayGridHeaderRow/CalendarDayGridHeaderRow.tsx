'use client';

import { useCalendarDayGridHeaderRow } from './useCalendarDayGridHeaderRow';
import { renderCalendarDayGridHeaderRow } from './renderCalendarDayGridHeaderRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderRowProps } from './CalendarDayGridHeaderRow.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDayGridHeaderRow renders the weekday labels above the day grid.
 */
export const CalendarDayGridHeaderRow: ForwardRefComponent<CalendarDayGridHeaderRowProps> =
  /*#__PURE__*/ composeComponent(
    'CalendarDayGridHeaderRow',
    useCalendarDayGridHeaderRow,
    renderCalendarDayGridHeaderRow,
  );
