import * as React from 'react';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import type { DataGridProps, DataGridState } from './DataGrid.types';
import { useTable_unstable } from '../Table/useTable';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { End, Home } from '@fluentui/keyboard-keys';
import {
  useTableFeatures,
  useTableSort,
  useTableSelection,
  useTableColumnSizing_unstable,
  useTableCompositeNavigation,
} from '../../hooks';
import { CELL_WIDTH } from '../TableSelectionCell';

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
    containerWidthOffset,
    resizableColumnsOptions = {},
  } = props;

  const widthOffset = containerWidthOffset ?? (selectionMode ? -CELL_WIDTH : 0);

  const gridTabsterAttribute = useArrowNavigationGroup({
    axis: 'grid',
  });

  const {
    onTableKeyDown: onCompositeKeyDown,
    tableTabsterAttribute: compositeTabsterAttribute,
    tableRowTabsterAttribute: compositeRowTabsterAttribute,
  } = useTableCompositeNavigation();

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
      containerWidthOffset: widthOffset,
      // Disables automatic resizing of columns when the container overflows.
      // This allows the sum of the columns to be larger than the container.
      autoFitColumns: resizableColumnsOptions.autoFitColumns ?? true,
    }),
  ]);

  const innerRef = React.useRef<HTMLDivElement>(null);
  const { findFirstFocusable, findLastFocusable } = useFocusFinders();
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLTableElement>) => {
    props.onKeyDown?.(e);
    focusMode === 'composite' && onCompositeKeyDown(e);

    // handle ctrl+home and ctrl+end
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
      ...(focusMode === 'cell' && gridTabsterAttribute),
      ...(focusMode === 'composite' && compositeTabsterAttribute),
      ...props,
      onKeyDown,
      ...(resizableColumns ? tableState.columnSizing_unstable.getTableProps(props) : {}),
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
    compositeRowTabsterAttribute,
  };
};
