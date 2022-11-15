import * as React from 'react';
import { useCalendar_unstable } from './useCalendar';
import { renderCalendar_unstable } from './renderCalendar';
import { useCalendarStyles_unstable } from './useCalendarStyles';
import type { CalendarProps } from './Calendar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Calendar component - TODO: add more docs
 */
export const Calendar: ForwardRefComponent<CalendarProps> = React.forwardRef((props, ref) => {
  const state = useCalendar_unstable(props, ref);

  useCalendarStyles_unstable(state);
  return renderCalendar_unstable(state);
});

Calendar.displayName = 'Calendar';
