'use client';

import * as React from 'react';
import { useCalendarDayGridCell_unstable } from './useCalendarDayGridCell';
import { useCalendarDayGridCellStyles_unstable } from './useCalendarDayGridCellStyles.styles';
import { renderCalendarDayGridCell_unstable } from './renderCalendarDayGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';

/**
 * A single day in the grid. Days repeat per week, so the cell resolves its own `dayCell` shorthand
 * from the grid context rather than being resolved once by the grid.
 */
export const CalendarDayGridCell: ForwardRefComponent<CalendarDayGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarDayGridCell_unstable(props, ref);

  useCalendarDayGridCellStyles_unstable(state);

  return renderCalendarDayGridCell_unstable(state);
});

CalendarDayGridCell.displayName = 'CalendarDayGridCell';
