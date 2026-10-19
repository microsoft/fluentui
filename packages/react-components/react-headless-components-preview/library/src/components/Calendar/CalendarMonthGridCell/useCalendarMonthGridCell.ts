'use client';

import type * as React from 'react';
import { useCalendarMonthGridCell_unstable } from '@fluentui/react-calendar-preview';
import { setCalendarGridTabStop } from '../calendarGridTabStop';
import type { CalendarMonthGridCellProps, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

export const useCalendarMonthGridCell = (
  props: CalendarMonthGridCellProps,
  ref?: React.Ref<HTMLButtonElement>,
): CalendarMonthGridCellState => {
  const state = useCalendarMonthGridCell_unstable(props, ref);
  // eslint-disable-next-line react-hooks/immutability
  state.root.tabIndex = props.month.isNavigated ? state.root.tabIndex : -1;

  const onFocus = state.root.onFocus;
  // eslint-disable-next-line react-hooks/immutability
  state.root.onFocus = event => {
    onFocus?.(event);
    setCalendarGridTabStop(event.currentTarget);
  };

  return state;
};
