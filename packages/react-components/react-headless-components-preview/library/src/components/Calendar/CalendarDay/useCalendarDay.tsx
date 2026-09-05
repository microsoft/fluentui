'use client';

import * as React from 'react';
import { useCalendarDayBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarDayGridRow } from '../CalendarDayGridRow';
import { CalendarDayGridHeaderRow } from '../CalendarDayGridHeaderRow';
import type { DayInfo } from '@fluentui/react-calendar-preview';
import type { CalendarDayHandle, CalendarDayProps, CalendarDayState } from './CalendarDay.types';

export { useCalendarDayContextValues_unstable as useCalendarDayContextValues } from '@fluentui/react-calendar-preview';

/**
 * Create the state required to render CalendarDay.
 *
 * @param props - props from this instance of CalendarDay
 * @param ref - imperative handle exposing focus
 */
export const useCalendarDay = (props: CalendarDayProps, ref: React.Ref<CalendarDayHandle>): CalendarDayState => {
  const state = useCalendarDayBase_unstable(props, ref);

  // `rowflow` matches the styled layer's `grid-linear` Tabster axis: moving past the end of a week
  // continues into the next one.
  // eslint-disable-next-line react-hooks/immutability
  state.grid.focusgroup = 'grid manual rowflow';

  const { weeks } = state;

  // The transition rows exist only to be animated out, so the unanimated layer skips them.
  // eslint-disable-next-line react-hooks/immutability
  state.body.children ??= (
    <>
      <CalendarDayGridHeaderRow />
      {weeks.slice(1, weeks.length - 1).map((week: DayInfo[], weekIndex: number) => (
        <CalendarDayGridRow key={weekIndex} week={week} weekIndex={weekIndex} />
      ))}
    </>
  );

  return state;
};
