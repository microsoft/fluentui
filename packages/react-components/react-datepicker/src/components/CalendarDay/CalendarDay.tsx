import * as React from 'react';
import { useCalendarDay_unstable } from './useCalendarDay';
import { renderCalendarDay_unstable } from './renderCalendarDay';
import { useCalendarDayStyles_unstable } from './useCalendarDayStyles';
import type { CalendarDayProps } from './CalendarDay.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * CalendarDay component - TODO: add more docs
 */
export const CalendarDay: ForwardRefComponent<CalendarDayProps> = React.forwardRef((props, ref) => {
  const state = useCalendarDay_unstable(props, ref);

  useCalendarDayStyles_unstable(state);
  return renderCalendarDay_unstable(state);
});

CalendarDay.displayName = 'CalendarDay';
