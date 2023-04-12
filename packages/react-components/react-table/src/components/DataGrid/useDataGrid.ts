import * as React from 'react';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import type { DataGridProps, DataGridState } from './DataGrid.types';
import { useTable_unstable } from '../Table/useTable';
import { useTableFeatures, useTableSort, useTableSelection, useTableColumnSizing_unstable } from '../../hooks';
import { CELL_WIDTH } from '../TableSelectionCell';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { End, Home } from '@fluentui/keyboard-keys';

/**
 * Create the state required to render DataGrid.
 *
 * The returned state can be modified with hooks such as useDataGridStyles_unstable,
 * before being passed to renderDataGrid_unstable.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGrid_unstable = (props: DataGridProps, ref: React.Ref<HTMLElement>): DataGridState => {
  const {
    items,
    columns,
    focusMode = 'cell',
    selectionMode,
    onSortChange,
    onSelectionChange,
    defaultSortState,
    sortState,
    selectedItems,
    defaultSelectedItems,
    subtleSelection = false,
    selectionAppearance = 'brand',
    getRowId,
    resizableColumns,
    columnSizingOptions,
    onColumnResize,
  } = props;

  const navigable = focusMode !== 'none';
  const keyboardNavAttr = useArrowNavigationGroup({
    axis: 'grid',
  });

  const tableState = useTableFeatures({ items, columns, getRowId }, [
    useTableSort({
      defaultSortState,
      sortState,
      onSortChange,
    }),
    useTableSelection({
      defaultSelectedItems,
      selectedItems,
      onSelectionChange,
      selectionMode: selectionMode ?? 'multiselect',
    }),
    useTableColumnSizing_unstable({
      onColumnResize,
      columnSizingOptions,
      // The selection cell is not part of the columns, therefore its width needs to be subtracted
      // from the container to make sure the columns don't overflow the table.
      containerWidthOffset: selectionMode ? -CELL_WIDTH : 0,
    }),
  ]);

  const innerRef = React.useRef<HTMLDivElement>(null);
  const { findFirstFocusable, findLastFocusable } = useFocusFinders();
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLTableElement>) => {
    props.onKeyDown?.(e);
    if (!innerRef.current || !e.ctrlKey || e.defaultPrevented) {
      return;
    }

    if (e.key === Home) {
      const firstRow = innerRef.current.querySelector('[role="row"]') as HTMLElement | null;
      if (firstRow) {
        findFirstFocusable(firstRow)?.focus();
      }
    }

    if (e.key === End) {
      const rows = innerRef.current.querySelectorAll('[role="row"]');
      if (rows.length) {
        const lastRow = rows.item(rows.length - 1);
        findLastFocusable(lastRow as HTMLElement)?.focus();
      }
    }
  });

  const baseTableState = useTable_unstable(
    {
      role: 'grid',
      as: 'div',
      noNativeElements: true,
      ...(navigable && keyboardNavAttr),
      ...props,
      onKeyDown,
    },
    useMergedRefs(ref, tableState.tableRef, innerRef),
  );

  return {
    ...baseTableState,
    focusMode,
    tableState,
    selectableRows: !!selectionMode,
    subtleSelection,
    selectionAppearance,
    resizableColumns,
  };
};
