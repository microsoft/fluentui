'use client';

import type * as React from 'react';
import { useCalendarMonthBase_unstable } from '@fluentui/react-calendar-preview';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { CalendarYear } from '../CalendarYear';
import type { CalendarMonthHandle, CalendarMonthProps, CalendarMonthState } from './CalendarMonth.types';

/**
 * Create the state required to render CalendarMonth.
 *
 * @param props - props from this instance of CalendarMonth
 * @param ref - imperative handle exposing focus
 */
export const useCalendarMonth = (
  props: CalendarMonthProps,
  ref: React.Ref<CalendarMonthHandle>,
): CalendarMonthState => {
  const state = useCalendarMonthBase_unstable(props, ref);
  const yearPicker = slot.always(props.yearPicker, {
    defaultProps: state.yearPicker,
    elementType: CalendarYear,
  });
  yearPicker.ref = useMergedRefs(state.yearPickerRef, yearPicker.ref);

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      yearPicker: CalendarYear,
    },
    yearPicker,
  };
};
