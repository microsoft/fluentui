import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { TableCellPrimaryItemProps, TableCellPrimaryItemState } from './TableCellPrimaryItem.types';
import { useTableCellItem_unstable } from '../TableCellItem/useTableCellItem';

/**
 * Create the state required to render TableCellPrimaryItem.
 *
 * The returned state can be modified with hooks such as useTableCellPrimaryItemStyles_unstable,
 * before being passed to renderTableCellPrimaryItem_unstable.
 *
 * @param props - props from this instance of TableCellPrimaryItem
 * @param ref - reference to root HTMLElement of TableCellPrimaryItem
 */
export const useTableCellPrimaryItem_unstable = (
  props: TableCellPrimaryItemProps,
  ref: React.Ref<HTMLElement>,
): TableCellPrimaryItemState => {
  const tableCellState = useTableCellItem_unstable(props, ref);

  return {
    ...tableCellState,
    components: {
      ...tableCellState.components,
      main: 'span',
      secondary: 'span',
      wrapper: 'div',
      media: 'span',
    },
    main: resolveShorthand(props.secondary),
    secondary: resolveShorthand(props.main),
    wrapper: resolveShorthand(props.wrapper, { required: !!props.main || !!props.secondary }),
  };
};
