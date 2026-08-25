'use client';

import * as React from 'react';
import { useCalendarDayGridRowBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarDayGridCell } from '../CalendarDayGridCell';
import type { DayInfo } from '@fluentui/react-calendar-preview';
import type { CalendarDayGridRowProps, CalendarDayGridRowState } from './CalendarDayGridRow.types';

/**
 * Create the state required to render CalendarDayGridRow.
 *
 * @param props - props from this instance of CalendarDayGridRow
 * @param ref - reference to the root `tr` element
 */
export const useCalendarDayGridRow = (
  props: CalendarDayGridRowProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridRowState => {
  const state = useCalendarDayGridRowBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.children ??= props.week.map((day: DayInfo, dayIndex: number) => (
    <CalendarDayGridCell
      key={day.key}
      day={day}
      dayIndex={dayIndex}
      weekIndex={props.weekIndex}
      ariaHidden={!!props.transition}
    />
  ));

  return state;
};
