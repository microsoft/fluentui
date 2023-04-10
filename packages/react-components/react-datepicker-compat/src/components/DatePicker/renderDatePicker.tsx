import * as React from 'react';
import { PopoverTrigger } from '@fluentui/react-popover';
import { getSlots } from '@fluentui/react-utilities';
import type { CalendarProps } from '../Calendar/Calendar.types';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';
import type { PopoverProps } from '@fluentui/react-popover';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState) => {
  const { slots, slotProps } = getSlots<DatePickerSlots>(state);

  return (
    <slots.popover {...(slotProps.popover as PopoverProps)}>
      <PopoverTrigger>{popoverTriggerChildProps => <slots.root {...slotProps.root} />}</PopoverTrigger>
      <slots.popoverSurface {...slotProps.popoverSurface}>
        <slots.calendar {...(slotProps.calendar as CalendarProps)} />
      </slots.popoverSurface>
    </slots.popover>
  );
};
