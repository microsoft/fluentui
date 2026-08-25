'use client';

import * as React from 'react';
import { useCalendarDayGridHeaderRow } from './useCalendarDayGridHeaderRow';
import { renderCalendarDayGridHeaderRow } from './renderCalendarDayGridHeaderRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderRowProps } from './CalendarDayGridHeaderRow.types';

/**
 * CalendarDayGridHeaderRow renders the weekday labels above the day grid.
 */
export const CalendarDayGridHeaderRow: ForwardRefComponent<CalendarDayGridHeaderRowProps> = React.forwardRef(
  (props, ref) => {
    const state = useCalendarDayGridHeaderRow(props, ref);

    return renderCalendarDayGridHeaderRow(state);
  },
);

CalendarDayGridHeaderRow.displayName = 'CalendarDayGridHeaderRow';
