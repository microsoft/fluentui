'use client';

import type * as React from 'react';
import { useCalendarYearGridCell_unstable } from '@fluentui/react-calendar-preview';
import { useCalendarGridTabStop } from '../calendarGridTabStop';
import type { CalendarYearGridCellProps, CalendarYearGridCellState } from './CalendarYearGridCell.types';

/**
 * Create the state required to render CalendarYearGridCell.
 */
export const useCalendarYearGridCell = (
  props: CalendarYearGridCellProps,
  ref: React.Ref<HTMLButtonElement>,
): CalendarYearGridCellState => {
  const state = useCalendarYearGridCell_unstable(props, ref);
  const tabStop = useCalendarGridTabStop(state.root, props.cell.isNavigated);
  return { ...state, root: { ...state.root, ...tabStop } };
};
