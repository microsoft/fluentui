'use client';

import * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarYear, useCalendarYearContextValues } from './useCalendarYear';
import { renderCalendarYear } from './renderCalendarYear';
import type { CalendarYearHandle, CalendarYearProps } from './CalendarYear.types';

/**
 * CalendarYear shows a range of years and lets the user pick one.
 */
export const CalendarYear: React.ForwardRefExoticComponent<CalendarYearProps & RefAttributes<CalendarYearHandle>> =
  React.forwardRef<CalendarYearHandle, CalendarYearProps>((props, ref) => {
    const state = useCalendarYear(props, ref);
    const contextValues = useCalendarYearContextValues(state);

    return renderCalendarYear(state, contextValues);
  });

CalendarYear.displayName = 'CalendarYear';
