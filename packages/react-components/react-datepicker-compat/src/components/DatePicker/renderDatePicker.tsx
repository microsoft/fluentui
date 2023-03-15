import * as React from 'react';
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
    <slots.root {...slotProps.root}>
      <slots.wrapper {...slotProps.wrapper}>
        <slots.inputField {...slotProps.inputField}>
          <slots.popover {...(slotProps.popover as PopoverProps)}>
            <slots.input {...slotProps.input} />
            <slots.popoverSurface {...slotProps.popoverSurface}>
              <slots.calendar {...(slotProps.calendar as CalendarProps)} />
            </slots.popoverSurface>
          </slots.popover>
        </slots.inputField>
      </slots.wrapper>
    </slots.root>
  );
};
