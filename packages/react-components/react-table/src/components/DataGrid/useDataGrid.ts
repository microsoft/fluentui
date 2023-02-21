import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import type { DataGridProps, DataGridState } from './DataGrid.types';
import { useTable_unstable } from '../Table/useTable';
import { useTableFeatures, useTableSort, useTableSelection, useTableColumnSizing_unstable } from '../../hooks';
import { CELL_WIDTH } from '../TableSelectionCell';
import { useMergedRefs } from '@fluentui/react-utilities';

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
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

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

  const baseTableState = useTable_unstable(
    {
      role: 'grid',
      as: 'div',
      noNativeElements: true,
      ...(navigable && keyboardNavAttr),
      ...props,
    },
    useMergedRefs(ref, tableState.tableRef),
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
