import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TableCellItemProps, TableCellItemState } from './TableCellItem.types';

/**
 * Create the state required to render TableCellItem.
 *
 * The returned state can be modified with hooks such as useTableCellItemStyles_unstable,
 * before being passed to renderTableCellItem_unstable.
 *
 * @param props - props from this instance of TableCellItem
 * @param ref - reference to root HTMLElement of TableCellItem
 */
export const useTableCellItem_unstable = (
  props: TableCellItemProps,
  ref: React.Ref<HTMLElement>,
): TableCellItemState => {
  return {
    components: {
      root: 'div',
      media: 'span',
    },
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    media: resolveShorthand(props.media),
  };
};
