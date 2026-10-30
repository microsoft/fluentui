'use client';

import { TableResizeHandle } from '../TableResizeHandle';
import type { TableColumnSizingState, TableFeaturesState, UseTableColumnSizingParams } from './types';

import { useKeyboardResizing } from './useKeyboardResizing';
import { useColumnResize, useColumnSizingFeature } from './useColumnSizingFeature';

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  setColumnWidth: () => null,
  getTableProps: () => ({}),
  getTableHeaderCellProps: () => ({ style: {}, columnId: '' }),
  getTableCellProps: () => ({ style: {}, columnId: '' }),
  enableKeyboardMode: () => () => null,
};

export function useTableColumnSizing_unstable<TItem>(params?: UseTableColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render

  return (tableState: TableFeaturesState<TItem>): TableFeaturesState<TItem> =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTableColumnSizingState(tableState, { autoFitColumns: true, ...params });
}

function useTableColumnSizingState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnSizingParams = {},
): TableFeaturesState<TItem> {
  const columnResize = useColumnResize(tableState, params);
  // Creates the keyboard handler for resizing columns
  const keyboardResizing = useKeyboardResizing(columnResize.columnResizeState);

  return useColumnSizingFeature(tableState, params, columnResize, keyboardResizing, TableResizeHandle);
}
