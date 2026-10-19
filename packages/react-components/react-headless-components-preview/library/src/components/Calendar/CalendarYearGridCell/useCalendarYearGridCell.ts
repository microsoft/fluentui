'use client';

import type * as React from 'react';
import { useCalendarYearGridCell_unstable } from '@fluentui/react-calendar-preview';
import { setCalendarGridTabStop } from '../calendarGridTabStop';
import type { CalendarYearGridCellProps, CalendarYearGridCellState } from './CalendarYearGridCell.types';

export const useCalendarYearGridCell = (
  props: CalendarYearGridCellProps,
  ref: React.Ref<HTMLButtonElement>,
): CalendarYearGridCellState => {
  const state = useCalendarYearGridCell_unstable(props, ref);
  // eslint-disable-next-line react-hooks/immutability
  state.root.tabIndex = props.cell.isNavigated ? state.root.tabIndex : -1;

  const onFocus = state.root.onFocus;
  // eslint-disable-next-line react-hooks/immutability
  state.root.onFocus = event => {
    onFocus?.(event);
    setCalendarGridTabStop(event.currentTarget);
  };

  return state;
};
