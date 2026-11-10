import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DatePickerProps, DatePickerState } from './DatePicker.types';

/**
 * Create the state required to render DatePicker.
 *
 * The returned state can be modified with hooks such as useDatePickerStyles_unstable,
 * before being passed to renderDatePicker_unstable.
 *
 * @param props - props from this instance of DatePicker
 * @param ref - reference to root HTMLDivElement of DatePicker
 */
export const useDatePicker_unstable = (props: DatePickerProps, ref: React.Ref<HTMLDivElement>): DatePickerState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
