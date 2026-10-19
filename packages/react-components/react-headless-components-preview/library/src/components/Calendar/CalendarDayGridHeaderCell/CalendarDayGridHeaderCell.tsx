'use client';

import { useCalendarDayGridHeaderCell } from './useCalendarDayGridHeaderCell';
import { renderCalendarDayGridHeaderCell } from './renderCalendarDayGridHeaderCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellProps } from './CalendarDayGridHeaderCell.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDayGridHeaderCell renders a single weekday label in the day grid header.
 */
export const CalendarDayGridHeaderCell: ForwardRefComponent<CalendarDayGridHeaderCellProps> =
  /*#__PURE__*/ composeComponent(
    'CalendarDayGridHeaderCell',
    useCalendarDayGridHeaderCell,
    renderCalendarDayGridHeaderCell,
  );
