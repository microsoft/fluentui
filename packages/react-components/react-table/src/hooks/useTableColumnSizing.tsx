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

export const KeyboardResizingCurrentColumnDataAttribute = 'data-keyboard-resizing';

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  setColumnWidth: () => null,
  getTableHeaderCellProps: () => ({ style: {}, columnId: '' }),
  getTableCellProps: () => ({ style: {}, columnId: '' }),
  enableKeyboardMode: () => () => null,
};

export function useTableColumnSizing_unstable<TItem>(params?: UseTableColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableColumnSizingState(tableState, params);
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

function useTableColumnSizingState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params?: UseTableColumnSizingParams,
): TableFeaturesState<TItem> {
  const { columns } = tableState;

  // Gets the container width
  const { width, measureElementRef } = useMeasureElement();
  // Creates the state based on columns and available containerWidth
  const columnResizeState = useTableColumnResizeState(columns, width + (params?.containerWidthOffset || 0), params);
  // Creates the mouse handler and attaches the state to it
  const mouseHandler = useTableColumnResizeMouseHandler(columnResizeState);
  // Creates the keyboard handler for resizing columns
  const { toggleInteractiveMode, columnId: keyboardResizingColumnId } = useKeyboardResizing(columnResizeState);

  const enableKeyboardMode = React.useCallback(
    (columnId: TableColumnId, onChange?: EnableKeyboardModeOnChangeCallback) =>
      (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.nativeEvent.stopPropagation();
        toggleInteractiveMode(columnId, onChange);
      },
    [toggleInteractiveMode],
  );

  return {
    ...tableState,
    tableRef: measureElementRef,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    columnSizing_unstable: {
      getOnMouseDown: mouseHandler.getOnMouseDown,
      setColumnWidth: (columnId: TableColumnId, w: number) =>
        columnResizeState.setColumnWidth(undefined, { columnId, width: w }),
      getColumnWidths: columnResizeState.getColumns,
      getTableHeaderCellProps: (columnId: TableColumnId) => {
        const col = columnResizeState.getColumnById(columnId);

        const aside = (
          <TableResizeHandle
            onMouseDown={mouseHandler.getOnMouseDown(columnId)}
            onTouchStart={mouseHandler.getOnMouseDown(columnId)}
          />
        );
        return col
          ? {
              style: getColumnStyles(col),
              aside,
              ...(keyboardResizingColumnId === columnId ? { [KeyboardResizingCurrentColumnDataAttribute]: '' } : {}),
            }
          : {};
      },
      getTableCellProps: (columnId: TableColumnId) => {
        const col = columnResizeState.getColumnById(columnId);
        return col ? { style: getColumnStyles(col) } : {};
      },
      enableKeyboardMode,
    },
  };
}
