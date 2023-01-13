import * as React from 'react';
import { useCalendarYear_unstable } from './useCalendarYear';
import { renderCalendarYear_unstable } from './renderCalendarYear';
import { useCalendarYearStyles_unstable } from './useCalendarYearStyles';
import type { CalendarYearProps } from './CalendarYear.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * CalendarYear component - TODO: add more docs
 */
export const CalendarYear: ForwardRefComponent<CalendarYearProps> = React.forwardRef((props, ref) => {
  const state = useCalendarYear_unstable(props, ref);

  useCalendarYearStyles_unstable(state);
  return renderCalendarYear_unstable(state);
});

CalendarYear.displayName = 'CalendarYear';
