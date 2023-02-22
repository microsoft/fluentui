import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import {
  TableColumnDefinition,
  TableColumnId,
  ColumnResizeState,
  ColumnWidthState,
  UseTableColumnSizingParams,
  TableColumnSizingOptions,
} from './types';
import {
  columnDefinitionsToState,
  adjustColumnWidthsToFitContainer,
  getColumnById,
  setColumnProperty,
  getColumnWidth,
} from '../utils/columnResizeUtils';

type ComponentState<T> = {
  columns: TableColumnDefinition<T>[];
  containerWidth: number;
  columnWidthState: ColumnWidthState[];
  columnSizingOptions: TableColumnSizingOptions | undefined;
};

type ColumnResizeStateAction<T> =
  | {
      type: 'CONTAINER_WIDTH_UPDATED';
      containerWidth: number;
    }
  | {
      type: 'COLUMNS_UPDATED';
      columns: TableColumnDefinition<T>[];
    }
  | {
      type: 'COLUMN_SIZING_OPTIONS_UPDATED';
      columnSizingOptions: TableColumnSizingOptions | undefined;
    }
  | {
      type: 'SET_COLUMN_WIDTH';
      columnId: TableColumnId;
      width: number;
    };

const createReducer = <T>() => (state: ComponentState<T>, action: ColumnResizeStateAction<T>): ComponentState<T> => {
  switch (action.type) {
    case 'CONTAINER_WIDTH_UPDATED':
      return {
        ...state,
        containerWidth: action.containerWidth,
        columnWidthState: adjustColumnWidthsToFitContainer(state.columnWidthState, action.containerWidth),
      };

    case 'COLUMNS_UPDATED':
      const newS = columnDefinitionsToState(action.columns, state.columnWidthState, state.columnSizingOptions);
      return {
        ...state,
        columns: action.columns,
        columnWidthState: adjustColumnWidthsToFitContainer(newS, state.containerWidth),
      };

    case 'COLUMN_SIZING_OPTIONS_UPDATED':
      const newState = columnDefinitionsToState(state.columns, state.columnWidthState, action.columnSizingOptions);
      return {
        ...state,
        columnSizingOptions: action.columnSizingOptions,
        columnWidthState: adjustColumnWidthsToFitContainer(newState, state.containerWidth),
      };

    case 'SET_COLUMN_WIDTH':
      const { columnId, width } = action;
      const { containerWidth } = state;

      const column = getColumnById(state.columnWidthState, columnId);
      let newColumnWidthState = [...state.columnWidthState];

      if (!column) {
        return state;
      }

      // Adjust the column width and measure the new total width
      newColumnWidthState = setColumnProperty(newColumnWidthState, columnId, 'width', width);
      // Set this width as idealWidth, because its a deliberate change, not a recalculation because of container
      newColumnWidthState = setColumnProperty(newColumnWidthState, columnId, 'idealWidth', width);
      // Adjust the widths to the container size
      newColumnWidthState = adjustColumnWidthsToFitContainer(newColumnWidthState, containerWidth);

      return { ...state, columnWidthState: newColumnWidthState };
  }
};

export function useTableColumnResizeState<T>(
  columns: TableColumnDefinition<T>[],
  containerWidth: number,
  params: UseTableColumnSizingParams = {},
): ColumnResizeState {
  const { onColumnResize, columnSizingOptions } = params;

  const reducer = React.useMemo(() => createReducer<T>(), []);

  const [state, dispatch] = React.useReducer(reducer, {
    columns,
    containerWidth: 0,
    columnWidthState: columnDefinitionsToState(columns, undefined, columnSizingOptions),
    columnSizingOptions,
  });

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'CONTAINER_WIDTH_UPDATED', containerWidth });
  }, [containerWidth]);

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'COLUMNS_UPDATED', columns });
  }, [columns]);

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'COLUMN_SIZING_OPTIONS_UPDATED', columnSizingOptions });
  }, [columnSizingOptions]);

  const setColumnWidth = useEventCallback(
    (event: MouseEvent | TouchEvent | undefined, data: { columnId: TableColumnId; width: number }) => {
      let { width } = data;
      const { columnId } = data;
      const col = getColumnById(state.columnWidthState, columnId);
      if (!col) {
        return;
      }

      width = Math.max(col.minWidth || 0, width);

      if (onColumnResize) {
        onColumnResize(event, { columnId, width });
      }
      dispatch({ type: 'SET_COLUMN_WIDTH', columnId, width });
    },
  );

  return {
    getColumnById: (colId: TableColumnId) => getColumnById(state.columnWidthState, colId),
    getColumns: () => state.columnWidthState,
    getColumnWidth: (colId: TableColumnId) => getColumnWidth(state.columnWidthState, colId),
    setColumnWidth,
  };
}
