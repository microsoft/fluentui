'use client';

import * as React from 'react';
import { useCalendarDayGridCell_unstable } from '@fluentui/react-calendar-preview';
import { CalendarDayFocusTargetContext, useCalendarGridTabStop } from '../calendarGridTabStop';
import type { CalendarDayGridCellProps, CalendarDayGridCellState } from './CalendarDayGridCell.types';

/**
 * Create the state required to render CalendarDayGridCell.
 */
export const useCalendarDayGridCell = (
  props: CalendarDayGridCellProps,
  ref: React.Ref<HTMLTableCellElement>,
): CalendarDayGridCellState => {
  const state = useCalendarDayGridCell_unstable(props, ref);
  const focusTarget = React.useContext(CalendarDayFocusTargetContext);
  const isNavigated = focusTarget !== undefined && props.day.originalDate?.toDateString() === focusTarget;
  const tabStop = useCalendarGridTabStop(state.root, isNavigated);

  return { ...state, root: { ...state.root, ...tabStop } };
};
