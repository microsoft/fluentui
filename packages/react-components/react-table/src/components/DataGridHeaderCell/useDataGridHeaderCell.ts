import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { DataGridHeaderCellProps, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCell_unstable } from '../TableHeaderCell/useTableHeaderCell';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useColumnIdContext } from '../../contexts/columnIdContext';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render DataGridHeaderCell.
 *
 * The returned state can be modified with hooks such as useDataGridHeaderCellStyles_unstable,
 * before being passed to renderDataGridHeaderCell_unstable.
 *
 * @param props - props from this instance of DataGridHeaderCell
 * @param ref - reference to root HTMLElement of DataGridHeaderCell
 */
export const useDataGridHeaderCell_unstable = (
  props: DataGridHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): DataGridHeaderCellState => {
  const columnId = useColumnIdContext();
  const { sortable } = useTableContext();
  const toggleColumnSort = useDataGridContext_unstable(ctx => ctx.sort.toggleColumnSort);
  const sortDirection = useDataGridContext_unstable(ctx =>
    sortable ? ctx.sort.getSortDirection(columnId) : undefined,
  );

  const resizableColumns = useDataGridContext_unstable(ctx => ctx.resizableColumns);
  const columnSizing = useDataGridContext_unstable(ctx => ctx.columnSizing_unstable);

  // eslint-disable-next-line deprecation/deprecation -- prefer HTMLTableCellElement
  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    if (sortable) {
      toggleColumnSort(e, columnId);
    }
    props.onClick?.(e);
  });

  return useTableHeaderCell_unstable(
    {
      sortDirection,
      as: 'div',
      tabIndex: sortable ? undefined : 0,
      ...(resizableColumns ? columnSizing.getTableHeaderCellProps(columnId) : {}),
      ...props,
      onClick,
    },
    ref,
  );
};
