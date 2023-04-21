/** @jsxRuntime classic */
/** @jsxFrag React.Fragment */
/** @jsx createElement */

import * as React from 'react';
import { createElement } from '@fluentui/react-jsx-runtime';
import { Portal } from '@fluentui/react-portal';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { CalendarProps } from '../Calendar/Calendar.types';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

/**
 * Render the final JSX of DatePicker
 */
export const renderDatePicker_unstable = (state: DatePickerState) => {
  const { slots, slotProps } = getSlotsNext<DatePickerSlots>(state);
  const { inlinePopup } = state;

  return (
    <>
      <slots.root {...slotProps.root} />
      {slots.popupSurface &&
        (inlinePopup ? (
          <slots.popupSurface {...slotProps.popupSurface}>
            <slots.calendar {...(slotProps.calendar as CalendarProps)} />
          </slots.popupSurface>
        ) : (
          <Portal>
            <slots.popupSurface {...slotProps.popupSurface}>
              <slots.calendar {...(slotProps.calendar as CalendarProps)} />
            </slots.popupSurface>
          </Portal>
        ))}
    </>
  );
};
