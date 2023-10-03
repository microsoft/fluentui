import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
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
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    visible: props.visible ?? false,
  };
};
