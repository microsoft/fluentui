'use client';

import * as React from 'react';
import { useCalendarDayGridHeaderRowBase_unstable } from '@fluentui/react-calendar-preview';
import { CalendarDayGridHeaderCell } from '../CalendarDayGridHeaderCell';
import type { CalendarWeekDayLabel } from '@fluentui/react-calendar-preview';
import type { CalendarDayGridHeaderRowProps, CalendarDayGridHeaderRowState } from './CalendarDayGridHeaderRow.types';

/**
 * Create the state required to render CalendarDayGridHeaderRow.
 *
 * @param props - props from this instance of CalendarDayGridHeaderRow
 * @param ref - reference to the root `tr` element
 */
export const useCalendarDayGridHeaderRow = (
  props: CalendarDayGridHeaderRowProps,
  ref: React.Ref<HTMLTableRowElement>,
): CalendarDayGridHeaderRowState => {
  const state = useCalendarDayGridHeaderRowBase_unstable(props, ref);

  state.root.children ??= state.dayLabels.map((dayLabel: CalendarWeekDayLabel) => (
    <CalendarDayGridHeaderCell key={dayLabel.key} dayLabel={dayLabel} />
  ));

  return state;
};
