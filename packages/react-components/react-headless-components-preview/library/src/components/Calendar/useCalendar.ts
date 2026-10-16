'use client';

import type * as React from 'react';
import { useCalendarBase_unstable } from '@fluentui/react-calendar-preview';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { CalendarDay } from './CalendarDay';
import { CalendarMonth } from './CalendarMonth';
import type { CalendarProps, CalendarState } from './Calendar.types';

export { useCalendarContextValues_unstable as useCalendarContextValues } from '@fluentui/react-calendar-preview';

/**
 * Create the state required to render Calendar.
 *
 * @param props - props from this instance of Calendar
 * @param ref - reference to the root element of Calendar
 */
export const useCalendar = (props: CalendarProps, ref: React.Ref<HTMLDivElement>): CalendarState => {
  const state = useCalendarBase_unstable(props, ref);
  const dayPicker = slot.optional(props.dayPicker, {
    renderByDefault: true,
    defaultProps: state.dayPicker,
    elementType: CalendarDay,
  });
  const monthPicker = slot.optional(props.monthPicker, {
    renderByDefault: true,
    defaultProps: state.monthPicker,
    elementType: CalendarMonth,
  });
  const mergedDayPickerRef = useMergedRefs(state.dayPickerRef, dayPicker?.ref);
  const mergedMonthPickerRef = useMergedRefs(state.monthPickerRef, monthPicker?.ref);

  if (dayPicker) {
    dayPicker.ref = mergedDayPickerRef;
  }
  if (monthPicker) {
    monthPicker.ref = mergedMonthPickerRef;
  }

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      dayPicker: CalendarDay,
      monthPicker: CalendarMonth,
    },
    dayPicker,
    monthPicker,
  };
};
