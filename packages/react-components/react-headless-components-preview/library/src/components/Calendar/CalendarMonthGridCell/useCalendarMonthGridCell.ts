'use client';

import type * as React from 'react';
import { useCalendarMonthGridCell_unstable } from '@fluentui/react-calendar-preview';
import { useCalendarGridTabStop } from '../calendarGridTabStop';
import type { CalendarMonthGridCellProps, CalendarMonthGridCellState } from './CalendarMonthGridCell.types';

/**
 * Create the state required to render CalendarMonthGridCell.
 */
export const useCalendarMonthGridCell = (
  props: CalendarMonthGridCellProps,
  ref?: React.Ref<HTMLButtonElement>,
): CalendarMonthGridCellState => {
  const state = useCalendarMonthGridCell_unstable(props, ref);
  const tabStop = useCalendarGridTabStop(state.root, props.month.isNavigated);
  return { ...state, root: { ...state.root, ...tabStop } };
};
