'use client';

import * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarDay, useCalendarDayContextValues } from './useCalendarDay';
import { renderCalendarDay } from './renderCalendarDay';
import type { CalendarDayHandle, CalendarDayProps } from './CalendarDay.types';

/**
 * CalendarDay shows a month header with navigation, above the grid of that month's days.
 */
export const CalendarDay: React.ForwardRefExoticComponent<CalendarDayProps & RefAttributes<CalendarDayHandle>> =
  React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) => {
    const state = useCalendarDay(props, ref);
    const contextValues = useCalendarDayContextValues(state);

    return renderCalendarDay(state, contextValues);
  });

CalendarDay.displayName = 'CalendarDay';
