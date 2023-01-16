import * as React from 'react';
import { useCalendarMonth_unstable } from './useCalendarMonth';
import { renderCalendarMonth_unstable } from './renderCalendarMonth';
import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles';
import type { CalendarMonthProps } from './CalendarMonth.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * CalendarMonth component - TODO: add more docs
 */
export const CalendarMonth: ForwardRefComponent<CalendarMonthProps> = React.forwardRef((props, ref) => {
  const state = useCalendarMonth_unstable(props, ref);

  useCalendarMonthStyles_unstable(state);
  return renderCalendarMonth_unstable(state);
});

CalendarMonth.displayName = 'CalendarMonth';
