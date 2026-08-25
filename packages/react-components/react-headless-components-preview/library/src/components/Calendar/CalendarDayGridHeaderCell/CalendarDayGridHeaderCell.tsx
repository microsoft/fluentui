'use client';

import { useCalendarDayGridHeaderCell } from './useCalendarDayGridHeaderCell';
import { renderCalendarDayGridHeaderCell } from './renderCalendarDayGridHeaderCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellProps } from './CalendarDayGridHeaderCell.types';

/**
 * CalendarDayGridHeaderCell renders a single weekday label in the day grid header.
 */
export const CalendarDayGridHeaderCell = (props: CalendarDayGridHeaderCellProps): JSXElement => {
  const state = useCalendarDayGridHeaderCell(props);

  return renderCalendarDayGridHeaderCell(state);
};

CalendarDayGridHeaderCell.displayName = 'CalendarDayGridHeaderCell';
