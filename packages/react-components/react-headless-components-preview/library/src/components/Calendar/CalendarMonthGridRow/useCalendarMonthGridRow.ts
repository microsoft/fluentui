'use client';

import * as React from 'react';
import { useCalendarMonthGridRowBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarMonthGridCell } from '../CalendarMonthGridCell';
import type { CalendarMonthGridRowProps, CalendarMonthGridRowState } from './CalendarMonthGridRow.types';

/**
 * Create the state required to render CalendarMonthGridRow.
 */
export const useCalendarMonthGridRow = (
  props: CalendarMonthGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarMonthGridRowState => {
  const state = useCalendarMonthGridRowBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.children ??= state.cells.map(month =>
    React.createElement(CalendarMonthGridCell, { key: month.index, month }),
  );

  return state;
};
