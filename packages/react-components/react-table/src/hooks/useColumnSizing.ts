import {
  ColumnId,
  ColumnWidthProps,
  ColumnWidthState,
  TableColumnSizingState,
  TableState,
  UseColumnSizingParams,
} from './types';
import { useColumnResizeState } from './useColumnResizeState';
import { useFluent } from '../../../react-shared-contexts/src/ProviderContext';
import useColumnResizeMouseHandler from './useColumnResizeMouseHandler';
import { useMeasureElement } from './useMeasureElement';

export const defaultColumnSizingState: TableColumnSizingState = {
  getColumnWidth: () => 0,
  getColumnWidths: () => [],
  getOnMouseDown: () => () => null,
  getTotalWidth: () => 0,
  setColumnWidth: () => null,
  getColumnProps: () => ({ style: {}, columnId: '' }),
};

export function useColumnSizing_unstable<TItem>(params?: UseColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (tableState: TableState<TItem>) => useColumnSizingState(tableState, params);
}

function getColumnProps(column: ColumnWidthState): ColumnWidthProps {
  const width = column.width;
  return {
    columnId: column.columnId,
    style: {
      // native styles
      width,
      // non-native element styles (flex layout)
      minWidth: width,
      maxWidth: width,
    },
  };
}

function useColumnSizingState<TItem>(tableState: TableState<TItem>, params?: UseColumnSizingParams): TableState<TItem> {
  const { columns, tableRef } = tableState;

  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  // Gets the container width
  const containerWidth = useMeasureElement(tableRef);
  // Creates the state based on columns and available containerWidth
  const columnResizeState = useColumnResizeState<TItem>(columns, containerWidth, params);
  // Creates the mouse handler and attaches the state to it
  const mouseHandler = useColumnResizeMouseHandler(columnResizeState, win);

  return {
    ...tableState,
    columnSizing: {
      getOnMouseDown: (columnId: ColumnId) => mouseHandler.getOnMouseDown(columnId),
      getColumnWidth: (columnId: ColumnId) => columnResizeState.getColumnWidth(columnId),
      getTotalWidth: () => columnResizeState.getTotalWidth(),
      setColumnWidth: (columnId: ColumnId, newSize: number) => columnResizeState.setColumnWidth(columnId, newSize),
      getColumnWidths: () => columnResizeState.getColumns(),
      getColumnProps: (columnId: ColumnId) => {
        const col = columnResizeState.getColumnById(columnId);
        return col ? getColumnProps(col) : { columnId };
      },
    },
  };
}
