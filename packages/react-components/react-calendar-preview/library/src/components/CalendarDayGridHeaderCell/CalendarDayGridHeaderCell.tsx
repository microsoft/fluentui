'use client';

import { useCalendarDayGridHeaderCell_unstable } from './useCalendarDayGridHeaderCell';
import { useCalendarDayGridHeaderCellStyles_unstable } from './useCalendarDayGridHeaderCellStyles.styles';
import { renderCalendarDayGridHeaderCell_unstable } from './renderCalendarDayGridHeaderCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellProps } from './CalendarDayGridHeaderCell.types';

/**
 * A single weekday label in the day grid header. Labels repeat per column, so the cell resolves its
 * own state from the grid context rather than being resolved once by the header row.
 */
export const CalendarDayGridHeaderCell = (props: CalendarDayGridHeaderCellProps): JSXElement => {
  const state = useCalendarDayGridHeaderCell_unstable(props);

  useCalendarDayGridHeaderCellStyles_unstable(state);

  return renderCalendarDayGridHeaderCell_unstable(state);
};

CalendarDayGridHeaderCell.displayName = 'CalendarDayGridHeaderCell';
