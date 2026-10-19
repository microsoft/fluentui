'use client';

import type * as React from 'react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { useCalendarDay, useCalendarDayContextValues } from './useCalendarDay';
import { renderCalendarDay } from './renderCalendarDay';
import type { CalendarDayHandle, CalendarDayProps } from './CalendarDay.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * CalendarDay shows a month header with navigation, above the grid of that month's days.
 */
export const CalendarDay: React.ForwardRefExoticComponent<CalendarDayProps & RefAttributes<CalendarDayHandle>> =
  /*#__PURE__*/ composeComponent('CalendarDay', useCalendarDay, renderCalendarDay, useCalendarDayContextValues);
