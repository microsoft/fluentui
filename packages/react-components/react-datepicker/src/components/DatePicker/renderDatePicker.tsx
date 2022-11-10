import * as React from 'react';
import { InputField } from '@fluentui/react-field';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-popover';
// import { getSlots } from '@fluentui/react-utilities';
// import type { DatePickerState, DatePickerSlots } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
// export const renderDatePicker_unstable = (state: DatePickerState) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderDatePicker_unstable = (state: any) => {
  // const { slots, slotProps } = getSlots<DatePickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  // return <slots.root {...slotProps.root} />;
  const { calendar, inputField, popover, popoverSurface, root, wrapper, Calendar } = state;

  return (
    <div {...root}>
      <div {...wrapper}>
        <Popover {...popover}>
          <PopoverTrigger>
            {popoverTriggerChildProps => (
              <InputField {...inputField} root={{ ...popoverTriggerChildProps, ...inputField.props }} />
            )}
          </PopoverTrigger>
          <PopoverSurface {...popoverSurface}>
            <Calendar {...calendar} />
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};
