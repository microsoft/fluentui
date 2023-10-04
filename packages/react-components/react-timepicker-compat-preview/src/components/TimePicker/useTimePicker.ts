import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { TimePickerProps, TimePickerState } from './TimePicker.types';

/**
 * Create the state required to render TimePicker.
 *
 * The returned state can be modified with hooks such as useTimePickerStyles_unstable,
 * before being passed to renderTimePicker_unstable.
 *
 * @param props - props from this instance of TimePicker
 * @param ref - reference to root HTMLElement of TimePicker
 */
export const useTimePicker_unstable = (props: TimePickerProps, ref: React.Ref<HTMLElement>): TimePickerState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
