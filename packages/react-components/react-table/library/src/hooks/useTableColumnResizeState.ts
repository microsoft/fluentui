'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import type {
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
      columnSizingOptions: TableColumnSizingOptions | undefined;
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

const areSizingOptionsEqual = (
  first: TableColumnSizingOptions | undefined,
  second: TableColumnSizingOptions | undefined,
): boolean => {
  if (first === second) {
    return true;
  }

  const columnIds = new Set([...Object.keys(first ?? {}), ...Object.keys(second ?? {})]);
  for (const columnId of columnIds) {
    const firstColumn = first?.[columnId];
    const secondColumn = second?.[columnId];
    if (
      firstColumn?.defaultWidth !== secondColumn?.defaultWidth ||
      firstColumn?.idealWidth !== secondColumn?.idealWidth ||
      firstColumn?.minWidth !== secondColumn?.minWidth ||
      firstColumn?.padding !== secondColumn?.padding ||
      firstColumn?.autoFitColumns !== secondColumn?.autoFitColumns
    ) {
      return false;
    }
  }
  return true;
};

const createReducer =
  <T>(autoFitColumns?: boolean) =>
  (state: ComponentState<T>, action: ColumnResizeStateAction<T>): ComponentState<T> => {
    switch (action.type) {
      case 'CONTAINER_WIDTH_UPDATED':
        return {
          ...state,
          containerWidth: action.containerWidth,
          columnWidthState: autoFitColumns
            ? adjustColumnWidthsToFitContainer(state.columnWidthState, action.containerWidth)
            : state.columnWidthState,
        };

      case 'COLUMNS_UPDATED':
        const newS = columnDefinitionsToState(action.columns, state.columnWidthState, action.columnSizingOptions);
        return {
          ...state,
          columns: action.columns,
          columnSizingOptions: action.columnSizingOptions,
          columnWidthState: autoFitColumns ? adjustColumnWidthsToFitContainer(newS, state.containerWidth) : newS,
        };

      case 'COLUMN_SIZING_OPTIONS_UPDATED':
        if (areSizingOptionsEqual(state.columnSizingOptions, action.columnSizingOptions)) {
          return state;
        }
        const newState = columnDefinitionsToState(state.columns, state.columnWidthState, action.columnSizingOptions);
        return {
          ...state,
          columnSizingOptions: action.columnSizingOptions,
          columnWidthState: autoFitColumns
            ? adjustColumnWidthsToFitContainer(newState, state.containerWidth)
            : newState,
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
        if (autoFitColumns) {
          newColumnWidthState = adjustColumnWidthsToFitContainer(newColumnWidthState, containerWidth);
        }

        return { ...state, columnWidthState: newColumnWidthState };
    }
  };

export function useTableColumnResizeState<T>(
  columns: TableColumnDefinition<T>[],
  containerWidth: number,
  params: UseTableColumnSizingParams = {},
): ColumnResizeState {
  const { onColumnResize, columnSizingOptions, autoFitColumns = true } = params;

  const reducer = React.useMemo(() => createReducer<T>(autoFitColumns), [autoFitColumns]);

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
    if (columns !== state.columns) {
      dispatch({ type: 'COLUMNS_UPDATED', columns, columnSizingOptions });
    }
  }, [columns, columnSizingOptions, state.columns]);

  useIsomorphicLayoutEffect(() => {
    if (!areSizingOptionsEqual(state.columnSizingOptions, columnSizingOptions)) {
      dispatch({ type: 'COLUMN_SIZING_OPTIONS_UPDATED', columnSizingOptions });
    }
  }, [columnSizingOptions, state.columnSizingOptions]);

  const setColumnWidth = useEventCallback(
    (event: KeyboardEvent | MouseEvent | TouchEvent | undefined, data: { columnId: TableColumnId; width: number }) => {
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
    getColumnById: React.useCallback(
      (colId: TableColumnId) => getColumnById(state.columnWidthState, colId),
      [state.columnWidthState],
    ),
    getColumns: React.useCallback(() => state.columnWidthState, [state.columnWidthState]),
    getColumnWidth: React.useCallback(
      (colId: TableColumnId) => getColumnWidth(state.columnWidthState, colId),
      [state.columnWidthState],
    ),
    setColumnWidth,
  };
}
