import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import type { DataGridHeaderCellProps, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { useTableHeaderCell_unstable } from '../TableHeaderCell/useTableHeaderCell';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useColumnIdContext } from '../../contexts/columnIdContext';
import { useTableContext } from '../../contexts/tableContext';
import { isColumnSortable } from '../../utils/isColumnSortable';

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
  const { sortable: gridSortable } = useTableContext();
  const toggleColumnSort = useDataGridContext_unstable(ctx => ctx.sort.toggleColumnSort);

  const sortable = useDataGridContext_unstable(ctx => {
    const columnSortable = !!ctx.columns.find(c => c.columnId === columnId && isColumnSortable(c));
    if (!gridSortable) {
      // if the grid is not sortable - disable sorting on all columns
      return false;
    }

    return columnSortable;
  });

  const sortDirection = useDataGridContext_unstable(ctx =>
    sortable ? ctx.sort.getSortDirection(columnId) : undefined,
  );
  const resizableColumns = useDataGridContext_unstable(ctx => ctx.resizableColumns);
  const getTableHeaderCellProps = useDataGridContext_unstable(ctx => {
    return ctx.columnSizing_unstable.getTableHeaderCellProps;
  });

  // eslint-disable-next-line deprecation/deprecation -- prefer HTMLTableCellElement
  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    if (sortable) {
      toggleColumnSort(e, columnId);
    }
    props.onClick?.(e);
  });

  return useTableHeaderCell_unstable(
    {
      sortable,
      sortDirection,
      as: 'div',
      tabIndex: sortable ? undefined : 0,
      ...(resizableColumns ? getTableHeaderCellProps(columnId) : {}),
      ...props,
      onClick,
    },
    ref,
  );
};
