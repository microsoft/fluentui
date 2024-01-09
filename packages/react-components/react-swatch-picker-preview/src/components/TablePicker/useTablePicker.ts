import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TablePickerProps, TablePickerState } from './TablePicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render TablePicker.
 *
 * The returned state can be modified with hooks such as useTablePickerStyles_unstable,
 * before being passed to renderTablePicker_unstable.
 *
 * @param props - props from this instance of TablePicker
 * @param ref - reference to root HTMLTableElement of TablePicker
 */
export const useTablePicker_unstable = (
  props: TablePickerProps,
  ref: React.Ref<HTMLTableElement>,
): TablePickerState => {
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: 'grid-linear',
    // axis: layout === 'row' ? 'both' : 'grid-linear',
    memorizeCurrent: true,
  });
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'table',
      tbody: 'tbody',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('table', {
        ref,
        ...props,
        ...focusAttributes,
      }),
      { elementType: 'table' },
    ),
    tbody: {},
  };
};
