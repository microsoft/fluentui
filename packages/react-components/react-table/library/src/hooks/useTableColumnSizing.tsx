import * as React from 'react';
import { TableResizeHandle } from '../TableResizeHandle';
import {
  ColumnWidthState,
  EnableKeyboardModeOnChangeCallback,
  TableColumnId,
  TableColumnSizingState,
  TableFeaturesState,
  UseTableColumnSizingParams,
} from './types';

import { useMeasureElement } from './useMeasureElement';
import { useTableColumnResizeMouseHandler } from './useTableColumnResizeMouseHandler';
import { useTableColumnResizeState } from './useTableColumnResizeState';
import { useKeyboardResizing } from './useKeyboardResizing';

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
  'use no memo';

  // False positive, these plugin hooks are intended to be run on every render

  return (tableState: TableFeaturesState<TItem>) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTableColumnSizingState(tableState, { autoFitColumns: true, ...params });
}

function getColumnStyles(column: ColumnWidthState, dragging?: boolean): React.CSSProperties {
  const width = column.width;

  return {
    // native styles
    width,
    // non-native element styles (flex layout)
    minWidth: width,
    maxWidth: width,
    // Fixed the unwanted sort: https://github.com/microsoft/fluentui/issues/27803
    ...(dragging ? { pointerEvents: 'none' } : {}),
  };
}

function useTableColumnSizingState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnSizingParams = {},
): TableFeaturesState<TItem> {
  const { columns } = tableState;

  // Gets the container width
  const { width, measureElementRef } = useMeasureElement();
  // Creates the state based on columns and available containerWidth
  const columnResizeState = useTableColumnResizeState(columns, width + (params?.containerWidthOffset || 0), params);
  // Creates the mouse handler and attaches the state to it
  const mouseHandler = useTableColumnResizeMouseHandler(columnResizeState);
  // Creates the keyboard handler for resizing columns
  const { toggleInteractiveMode, getKeyboardResizingProps } = useKeyboardResizing(columnResizeState);

  const { autoFitColumns } = params;

  const enableKeyboardMode = React.useCallback(
    (columnId: TableColumnId, onChange?: EnableKeyboardModeOnChangeCallback) =>
      (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.nativeEvent.stopPropagation();
        toggleInteractiveMode(columnId, onChange);
      },
    [toggleInteractiveMode],
  );

  const { getColumnById, setColumnWidth, getColumns } = columnResizeState;
  const { getOnMouseDown, dragging } = mouseHandler;
  return {
    ...tableState,
    tableRef: measureElementRef,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: {
      getOnMouseDown,
      setColumnWidth: (columnId: TableColumnId, w: number) => setColumnWidth(undefined, { columnId, width: w }),
      getColumnWidths: getColumns,
      getTableProps: (props = {}) => {
        return {
          ...props,
          style: {
            minWidth: 'fit-content',
            ...(props.style || {}),
          },
        };
      },
      getTableHeaderCellProps: React.useCallback(
        (columnId: TableColumnId) => {
          const col = getColumnById(columnId);
          const isLastColumn = columns[columns.length - 1]?.columnId === columnId;

          const aside =
            isLastColumn && autoFitColumns ? null : (
              <TableResizeHandle
                onMouseDown={getOnMouseDown(columnId)}
                onTouchStart={getOnMouseDown(columnId)}
                {...getKeyboardResizingProps(columnId, col?.width || 0)}
              />
            );

          return col
            ? {
                style: getColumnStyles(col, dragging),
                aside,
              }
            : {};
        },
        [getColumnById, columns, dragging, getKeyboardResizingProps, getOnMouseDown, autoFitColumns],
      ),
      getTableCellProps: React.useCallback(
        (columnId: TableColumnId) => {
          const col = getColumnById(columnId);
          return col ? { style: getColumnStyles(col) } : {};
        },
        [getColumnById],
      ),
      enableKeyboardMode,
    },
  };
}
