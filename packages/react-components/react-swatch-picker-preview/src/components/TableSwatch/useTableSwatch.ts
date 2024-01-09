import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableSwatchProps, TableSwatchState } from './TableSwatch.types';

/**
 * Create the state required to render TableSwatch.
 *
 * The returned state can be modified with hooks such as useTableSwatchStyles_unstable,
 * before being passed to renderTableSwatch_unstable.
 *
 * @param props - props from this instance of TableSwatch
 * @param ref - reference to root HTMLTableCellElement  of TableSwatch
 */
export const useTableSwatch_unstable = (
  props: TableSwatchProps,
  ref: React.Ref<HTMLTableCellElement>,
): TableSwatchState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'td',
      button: 'button',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('td', {
        ref,
        ...props,
      }),
      { elementType: 'td' },
    ),
    button: {},
    selected: props.selected,
    value: props.value,
  };
};
