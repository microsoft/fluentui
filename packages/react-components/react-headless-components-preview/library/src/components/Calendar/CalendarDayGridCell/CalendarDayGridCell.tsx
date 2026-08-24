'use client';

import { useCalendarDayGridCell } from './useCalendarDayGridCell';
import { renderCalendarDayGridCell } from './renderCalendarDayGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';

/**
 * CalendarDayGridCell renders a single day in the grid.
 */
export const CalendarDayGridCell = (props: CalendarDayGridCellProps): JSXElement => {
  const state = useCalendarDayGridCell(props);

  return renderCalendarDayGridCell(state);
};

CalendarDayGridCell.displayName = 'CalendarDayGridCell';
