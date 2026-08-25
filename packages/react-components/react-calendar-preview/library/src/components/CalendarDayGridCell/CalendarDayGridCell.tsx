'use client';

import { useCalendarDayGridCell_unstable } from './useCalendarDayGridCell';
import { useCalendarDayGridCellStyles_unstable } from './useCalendarDayGridCellStyles.styles';
import { renderCalendarDayGridCell_unstable } from './renderCalendarDayGridCell';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';

/**
 * A single day in the grid. Days repeat per week, so the cell resolves its own `dayCell` shorthand
 * from the grid context rather than being resolved once by the grid.
 */
export const CalendarDayGridCell = (props: CalendarDayGridCellProps): JSXElement => {
  const state = useCalendarDayGridCell_unstable(props);

  useCalendarDayGridCellStyles_unstable(state);

  return renderCalendarDayGridCell_unstable(state);
};

CalendarDayGridCell.displayName = 'CalendarDayGridCell';
