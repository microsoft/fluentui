import * as React from 'react';
import { PopoverTrigger } from '@fluentui/react-popover';
import { getSlots } from '@fluentui/react-utilities';
import type { PopoverProps } from '@fluentui/react-popover';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState) => {
  const { slots, slotProps } = getSlots<DatePickerSlots>(state);

  const { calendar, calendarAs: Calendar } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.wrapper {...slotProps.wrapper}>
        <slots.popover {...(slotProps.popover as PopoverProps)}>
          <PopoverTrigger>
            {popoverTriggerChildProps => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rootProps: any = { root: popoverTriggerChildProps };
              return (
                <slots.inputField {...slotProps.inputField}>
                  <slots.input {...slotProps.input} {...rootProps} />
                </slots.inputField>
              );
            }}
          </PopoverTrigger>
          <slots.popoverSurface {...slotProps.popoverSurface}>
            <Calendar {...calendar} />
          </slots.popoverSurface>
        </slots.popover>
      </slots.wrapper>
    </slots.root>
  );
};
