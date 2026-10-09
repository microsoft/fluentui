'use client';

import * as React from 'react';
import { useCalendarMonthBase_unstable } from '@fluentui/react-calendar-preview';
import { slot } from '@fluentui/react-utilities';
import { CalendarYear } from '../CalendarYear';
import { CalendarMonthGridRow } from '../CalendarMonthGridRow';
import type { CalendarMonthHandle, CalendarMonthProps, CalendarMonthState } from './CalendarMonth.types';

export { useCalendarMonthContextValues_unstable as useCalendarMonthContextValues } from '@fluentui/react-calendar-preview';

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

  // Replaces the styled layer's Tabster arrow navigation.
  // eslint-disable-next-line react-hooks/immutability
  state.grid.focusgroup = 'grid manual';

  // eslint-disable-next-line react-hooks/immutability
  state.grid.children ??= state.monthRows.map((_, rowIndex: number) => (
    <CalendarMonthGridRow key={rowIndex} rowIndex={rowIndex} />
  ));

  return {
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      yearPicker: CalendarYear,
    },
    yearPicker: slot.always(props.yearPicker, {
      defaultProps: { ...state.yearPicker, ref: state.yearPickerRef },
      elementType: CalendarYear,
    }),
  };
};
