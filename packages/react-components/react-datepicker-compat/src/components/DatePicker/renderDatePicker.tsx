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
    <slots.root {...slotProps.root}>
      <slots.wrapper {...slotProps.wrapper}>
        <slots.popover {...(slotProps.popover as PopoverProps)}>
          <PopoverTrigger>
            {popoverTriggerChildProps => {
              // onKeyDown/Up and onClick are not needed as DatePicker handles opening and closing the popover
              // internally. These also cause issues when typing in the input and clicking the input to open, not
              // letting the user open the popover by clicking the input and causing issues with BACKSPACE and SPACE
              // keys.
              const { onClick, onKeyDown, onKeyUp, role, ...inputTriggerProps } = popoverTriggerChildProps;
              const inputProps = { input: { ...inputTriggerProps } };

              return (
                <slots.field {...slotProps.field}>
                  <slots.input {...slotProps.input} {...inputProps} />
                </slots.field>
              );
            }}
          </PopoverTrigger>
          <slots.popoverSurface {...slotProps.popoverSurface}>
            <slots.calendar {...(slotProps.calendar as CalendarProps)} />
          </slots.popoverSurface>
        </slots.popover>
      </slots.wrapper>
    </slots.root>
  );
};
