'use client';

import * as React from 'react';
import { useCalendarDayGridCell } from './useCalendarDayGridCell';
import { renderCalendarDayGridCell } from './renderCalendarDayGridCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridCellProps } from './CalendarDayGridCell.types';

/**
 * CalendarDayGridCell renders a single day in the grid.
 */
export const CalendarDayGridCell: ForwardRefComponent<CalendarDayGridCellProps> = React.forwardRef((props, ref) => {
  const state = useCalendarDayGridCell(props, ref);

  return renderCalendarDayGridCell(state);
});

CalendarDayGridCell.displayName = 'CalendarDayGridCell';
