'use client';

import * as React from 'react';
import { useCalendarDayGridHeaderCell } from './useCalendarDayGridHeaderCell';
import { renderCalendarDayGridHeaderCell } from './renderCalendarDayGridHeaderCell';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderCellProps } from './CalendarDayGridHeaderCell.types';

/**
 * CalendarDayGridHeaderCell renders a single weekday label in the day grid header.
 */
export const CalendarDayGridHeaderCell: ForwardRefComponent<CalendarDayGridHeaderCellProps> = React.forwardRef(
  (props, ref) => {
    const state = useCalendarDayGridHeaderCell(props, ref);

    return renderCalendarDayGridHeaderCell(state);
  },
);

CalendarDayGridHeaderCell.displayName = 'CalendarDayGridHeaderCell';
