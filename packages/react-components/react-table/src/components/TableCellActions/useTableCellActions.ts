import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableCellActionsProps, TableCellActionsState } from './TableCellActions.types';

/**
 * Create the state required to render TableCellActions.
 *
 * The returned state can be modified with hooks such as useTableCellActionsStyles_unstable,
 * before being passed to renderTableCellActions_unstable.
 *
 * @param props - props from this instance of TableCellActions
 * @param ref - reference to root HTMLElement of TableCellActions
 */
export const useTableCellActions_unstable = (
  props: TableCellActionsProps,
  ref: React.Ref<HTMLElement>,
): TableCellActionsState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    visible: props.visible ?? false,
  };
};
