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
              // onKeyDown is not needed as DatePicker handles closing the popover with ESC internally. onKeyDown also
              // causes issues when typing in the input, not letting the user type SPACE and bugs with BACKSPACE.
              const { onKeyDown, ...inputTriggerProps } = popoverTriggerChildProps;
              const rootProps = { root: { ...inputTriggerProps } };

              return (
                <slots.inputField {...slotProps.inputField}>
                  <slots.input {...slotProps.input} {...rootProps} />
                </slots.inputField>
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
