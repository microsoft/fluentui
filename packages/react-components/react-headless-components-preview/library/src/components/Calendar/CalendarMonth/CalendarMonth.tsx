'use client';

import * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarMonth, useCalendarMonthContextValues } from './useCalendarMonth';
import { renderCalendarMonth } from './renderCalendarMonth';
import type { CalendarMonthHandle, CalendarMonthProps } from './CalendarMonth.types';

/**
 * CalendarMonth shows the months of the navigated year, and opens the year picker from its header.
 */
export const CalendarMonth: React.ForwardRefExoticComponent<CalendarMonthProps & RefAttributes<CalendarMonthHandle>> =
  React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) => {
    const state = useCalendarMonth(props, ref);
    const contextValues = useCalendarMonthContextValues(state);

    return renderCalendarMonth(state, contextValues);
  });

CalendarMonth.displayName = 'CalendarMonth';
