import * as React from 'react';
import { TableResizeHandle } from '../TableResizeHandle';
import {
  ColumnResizeState,
  ColumnWidthState,
  TableColumnId,
  TableColumnSizingState,
  TableFeaturesState,
  UseTableColumnSizingParams,
} from './types';
import { useMeasureElement } from './useMeasureElement';
import { useTableColumnResizeKeyboardHandler } from './useTableColumnResizeKeyboardHandler';
import { useTableColumnResizeMouseHandler } from './useTableColumnResizeMouseHandler';
import { useTableColumnResizeState } from './useTableColumnResizeState';

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  setColumnWidth: () => null,
  getTableHeaderCellProps: () => ({ style: {}, columnId: '' }),
  getTableCellProps: () => ({ style: {}, columnId: '' }),
};

export function useTableColumnSizing_unstable<TItem>(params?: UseTableColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableFeaturesState<TItem>) => useTableColumnSizingState(tableState, params);
}

const WithTableKeyboardHandler: React.FC<{
  columnResizeState: ColumnResizeState;
  children: (renderProps: {
    keyboardHandler: ReturnType<typeof useTableColumnResizeKeyboardHandler>;
  }) => React.ReactElement;
}> = props => {
  const { children } = props;
  const keyboardHandler = useTableColumnResizeKeyboardHandler(props.columnResizeState);

  return children({ keyboardHandler });
};

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
          <WithTableKeyboardHandler columnResizeState={columnResizeState}>
            {({ keyboardHandler }) => (
              <TableResizeHandle
                onMouseDown={mouseHandler.getOnMouseDown(columnId)}
                onTouchStart={mouseHandler.getOnMouseDown(columnId)}
                onKeyDown={keyboardHandler.getOnKeyDown(columnId)}
                onClick={keyboardHandler.getOnClick(columnId)}
                onBlur={keyboardHandler.getOnBlur()}
                value={col ? col.width : 0}
              />
            )}
          </WithTableKeyboardHandler>
        );
        return col ? { style: getColumnStyles(col), aside } : {};
      },
      getTableCellProps: (columnId: TableColumnId) => {
        const col = columnResizeState.getColumnById(columnId);
        return col ? { style: getColumnStyles(col) } : {};
      },
    },
  };
}
