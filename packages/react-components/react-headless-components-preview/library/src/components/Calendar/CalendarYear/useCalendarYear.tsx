'use client';

import * as React from 'react';
import { useCalendarYearBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarYearGridRow } from '../CalendarYearGridRow';
import type { CalendarYearHandle, CalendarYearProps, CalendarYearState } from './CalendarYear.types';

export { useCalendarYearContextValues_unstable as useCalendarYearContextValues } from '@fluentui/react-calendar-preview';

/**
 * Create the state required to render CalendarYear.
 *
 * @param props - props from this instance of CalendarYear
 * @param ref - imperative handle exposing focus
 */
export const useCalendarYear = (props: CalendarYearProps, ref: React.Ref<CalendarYearHandle>): CalendarYearState => {
  const state = useCalendarYearBase_unstable(props, ref);

  // Base cell handlers own two-dimensional navigation; focusgroup owns the roving tab stop.
  // eslint-disable-next-line react-hooks/immutability
  state.grid.focusgroup = 'toolbar inline';

  state.grid.children ??= state.yearRows.map((_, rowIndex: number) => (
    <CalendarYearGridRow key={rowIndex} rowIndex={rowIndex} />
  ));

  return state;
};
