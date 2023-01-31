import * as React from 'react';
import {
  TableColumnId,
  ColumnWidthState,
  TableColumnSizingState,
  TableFeaturesState,
  UseColumnSizingParams,
} from './types';
import { useColumnResizeState } from './useColumnResizeState';
import useColumnResizeMouseHandler from './useColumnResizeMouseHandler';
import { useMeasureElement } from './useMeasureElement';
import { TableResizeHandle } from '../TableResizeHandle';

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  setColumnWidth: () => null,
  getColumnProps: () => ({ style: {}, columnId: '' }),
};

export function useColumnSizing_unstable<TItem>(params?: UseColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useColumnSizingState(tableState, params);
}

function getColumnStyles(column: ColumnWidthState): React.CSSProperties {
  const width = column.width;

  return {
    // native styles
    width,
    // non-native element styles (flex layout)
    minWidth: width,
    maxWidth: width,
  };
}

function useColumnSizingState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params?: UseColumnSizingParams,
): TableFeaturesState<TItem> {
  const { columns } = tableState;

  // Gets the container width
  const { width, measureElementRef } = useMeasureElement();
  // Creates the state based on columns and available containerWidth
  const columnResizeState = useColumnResizeState(columns, width, params);
  // Creates the mouse handler and attaches the state to it
  const mouseHandler = useColumnResizeMouseHandler(columnResizeState);

  return {
    ...tableState,
    tableRef: measureElementRef,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: {
      getOnMouseDown: mouseHandler.getOnMouseDown,
      setColumnWidth: columnResizeState.setColumnWidth,
      getColumnWidths: columnResizeState.getColumns,
      getColumnProps: (columnId: TableColumnId) => {
        const col = columnResizeState.getColumnById(columnId);
        const aside = <TableResizeHandle onMouseDown={mouseHandler.getOnMouseDown(columnId)} />;
        return col ? { style: getColumnStyles(col), aside } : {};
      },
    },
  };
}
