import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
import { getSlots } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState) => {
  const { slots, slotProps } = getSlots<DatePickerSlots>(state);

  const { calendar, calendarAs: Calendar, popover, popoverSurface } = state;

  return (
    <slots.root {...slotProps.root}>
      <slots.wrapper {...slotProps.wrapper}>
        <Popover {...popover}>
          <PopoverTrigger>
            {popoverTriggerChildProps => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const rootProps: any = { root: popoverTriggerChildProps };
              return <slots.inputField {...slotProps.inputField} {...rootProps} />;
            }}
          </PopoverTrigger>
          <PopoverSurface {...popoverSurface}>
            <Calendar {...calendar} />
          </PopoverSurface>
        </Popover>
      </slots.wrapper>
    </slots.root>
  );
};
