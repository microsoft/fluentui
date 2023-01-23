import * as React from 'react';
import { useCalendarGrid_unstable } from './useCalendarGrid';
import { renderCalendarGrid_unstable } from './renderCalendarGrid';
import { useCalendarGridStyles_unstable } from './useCalendarGridStyles';
import type { CalendarGridProps } from './CalendarGrid.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * CalendarGrid component - TODO: add more docs
 */
export const CalendarGrid: ForwardRefComponent<CalendarGridProps> = React.forwardRef((props, ref) => {
  const state = useCalendarGrid_unstable(props, ref);

  useCalendarGridStyles_unstable(state);
  return renderCalendarGrid_unstable(state);
});

CalendarGrid.displayName = 'CalendarGrid';
