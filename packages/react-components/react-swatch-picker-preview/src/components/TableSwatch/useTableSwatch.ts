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
 * @param ref - reference to root HTMLDivElement of TableSwatch
 */
export const useTableSwatch_unstable = (props: TableSwatchProps, ref: React.Ref<HTMLDivElement>): TableSwatchState => {
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
