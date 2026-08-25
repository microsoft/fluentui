'use client';

import * as React from 'react';
import { useCalendarYearGridRowBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarYearGridCell } from '../CalendarYearGridCell';
import type { CalendarYearGridRowProps, CalendarYearGridRowState } from './CalendarYearGridRow.types';

/**
 * Create the state required to render CalendarYearGridRow.
 */
export const useCalendarYearGridRow = (
  props: CalendarYearGridRowProps,
  ref: React.Ref<HTMLDivElement>,
): CalendarYearGridRowState => {
  const state = useCalendarYearGridRowBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.children ??= state.cells.map(cell => React.createElement(CalendarYearGridCell, { key: cell.year, cell }));

  return state;
};
