import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TablePickerProps, TablePickerState } from './TablePicker.types';

/**
 * Create the state required to render TablePicker.
 *
 * The returned state can be modified with hooks such as useTablePickerStyles_unstable,
 * before being passed to renderTablePicker_unstable.
 *
 * @param props - props from this instance of TablePicker
 * @param ref - reference to root HTMLDivElement of TablePicker
 */
export const useTablePicker_unstable = (props: TablePickerProps, ref: React.Ref<HTMLDivElement>): TablePickerState => {
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
