'use client';

import type * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { useEventCallback } from '@fluentui/react-utilities';
import type {
  DataGridHeaderCellBaseProps,
  DataGridHeaderCellBaseState,
  DataGridHeaderCellProps,
  DataGridHeaderCellState,
} from './DataGridHeaderCell.types';
import { useTableHeaderCell_unstable, useTableHeaderCellBase_unstable } from '../TableHeaderCell/useTableHeaderCell';
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
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  return useTableHeaderCell_unstable(
    useDataGridHeaderCellProps(props, props.focusMode === 'group' ? focusableGroupAttr : undefined),
    ref,
  );
};

/**
 * Base state hook for DataGridHeaderCell, free of Tabster and of the default sort icon.
 *
 * @param props - props from this instance of DataGridHeaderCell
 * @param ref - reference to root HTMLElement of DataGridHeaderCell
 */
export const useDataGridHeaderCellBase_unstable = (
  props: DataGridHeaderCellBaseProps,
  ref: React.Ref<HTMLElement>,
): DataGridHeaderCellBaseState => {
  return useTableHeaderCellBase_unstable(useDataGridHeaderCellProps(props), ref);
};

/**
 * Props of the underlying table header cell, shared by the styled and the base DataGridHeaderCell hooks.
 */
function useDataGridHeaderCellProps(props: DataGridHeaderCellBaseProps, focusProps?: object) {
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

  const { focusMode = sortable ? 'none' : 'cell' } = props;

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- prefer HTMLTableCellElement
  const onClick = useEventCallback((e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
    if (sortable) {
      toggleColumnSort(e, columnId);
    }
    props.onClick?.(e);
  });

  return {
    sortable,
    sortDirection,
    as: 'div' as const,
    tabIndex: focusMode !== 'none' ? 0 : undefined,
    ...focusProps,
    ...(resizableColumns ? getTableHeaderCellProps(columnId) : {}),
    ...props,
    onClick,
  };
}
