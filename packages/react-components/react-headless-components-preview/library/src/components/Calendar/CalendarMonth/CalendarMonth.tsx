'use client';

import type * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarMonth, useCalendarMonthContextValues } from './useCalendarMonth';
import { renderCalendarMonth } from './renderCalendarMonth';
import type { CalendarMonthHandle, CalendarMonthProps } from './CalendarMonth.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarMonth shows the months of the navigated year, and opens the year picker from its header.
 */
export const CalendarMonth: React.ForwardRefExoticComponent<CalendarMonthProps & RefAttributes<CalendarMonthHandle>> =
  /*#__PURE__*/ composeComponent('CalendarMonth', useCalendarMonth, renderCalendarMonth, useCalendarMonthContextValues);
