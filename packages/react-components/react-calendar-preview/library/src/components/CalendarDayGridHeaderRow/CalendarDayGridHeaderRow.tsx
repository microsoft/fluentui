'use client';

import * as React from 'react';
import { useCalendarDayGridHeaderRow_unstable } from './useCalendarDayGridHeaderRow';
import { useCalendarDayGridHeaderRowStyles_unstable } from './useCalendarDayGridHeaderRowStyles.styles';
import { renderCalendarDayGridHeaderRow_unstable } from './renderCalendarDayGridHeaderRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridHeaderRowProps } from './CalendarDayGridHeaderRow.types';

/**
 * The weekday label row above the day grid.
 */
export const CalendarDayGridHeaderRow: ForwardRefComponent<CalendarDayGridHeaderRowProps> = React.forwardRef(
  (props, ref) => {
    const state = useCalendarDayGridHeaderRow_unstable(props, ref);

    useCalendarDayGridHeaderRowStyles_unstable(state);

    return renderCalendarDayGridHeaderRow_unstable(state);
  },
);

CalendarDayGridHeaderRow.displayName = 'CalendarDayGridHeaderRow';
