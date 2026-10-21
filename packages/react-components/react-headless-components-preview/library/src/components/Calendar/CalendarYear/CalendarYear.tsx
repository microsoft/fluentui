'use client';

import type * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarYear } from './useCalendarYear';
import { renderCalendarYear } from './renderCalendarYear';
import type { CalendarYearHandle, CalendarYearProps } from './CalendarYear.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarYear shows a range of years and lets the user pick one.
 */
export const CalendarYear: React.ForwardRefExoticComponent<CalendarYearProps & RefAttributes<CalendarYearHandle>> =
  /*#__PURE__*/ composeComponent('CalendarYear', useCalendarYear, renderCalendarYear);
