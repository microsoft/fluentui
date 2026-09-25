'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import type {
  TableColumnDefinition,
  TableColumnId,
  ColumnResizeState,
  AutoFitColumnsStrategy,
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
  /**
   * Columns the user has deliberately resized. The even distribution keeps them at the width they
   * were given instead of growing them together with the columns that are still auto-fitted.
   */
  resizedColumns: ReadonlySet<TableColumnId>;
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

const createReducer =
  <T>(autoFitColumns?: boolean, strategy: AutoFitColumnsStrategy = 'last-column') =>
  (state: ComponentState<T>, action: ColumnResizeStateAction<T>): ComponentState<T> => {
    const autoFit = (
      columnWidthState: ColumnWidthState[],
      containerWidth: number,
      resizedColumns = state.resizedColumns,
    ) =>
      autoFitColumns
        ? adjustColumnWidthsToFitContainer(columnWidthState, containerWidth, strategy, resizedColumns)
        : columnWidthState;

    switch (action.type) {
      case 'CONTAINER_WIDTH_UPDATED':
        return {
          ...state,
          containerWidth: action.containerWidth,
          columnWidthState: autoFit(state.columnWidthState, action.containerWidth),
        };

      case 'COLUMNS_UPDATED':
        const newS = columnDefinitionsToState(action.columns, state.columnWidthState, state.columnSizingOptions);
        // A column that was removed must not keep the table's remaining space reserved for it.
        const remainingResizedColumns = keepResizedColumns(state.resizedColumns, action.columns);
        return {
          ...state,
          columns: action.columns,
          resizedColumns: remainingResizedColumns,
          columnWidthState: autoFit(newS, state.containerWidth, remainingResizedColumns),
        };

      case 'COLUMN_SIZING_OPTIONS_UPDATED':
        const newState = columnDefinitionsToState(state.columns, state.columnWidthState, action.columnSizingOptions);
        return {
          ...state,
          columnSizingOptions: action.columnSizingOptions,
          columnWidthState: autoFit(newState, state.containerWidth),
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

        let resizedColumns: ReadonlySet<TableColumnId> = new Set(state.resizedColumns).add(columnId);
        // Once every column has been deliberately sized, the widths on screen are the chosen
        // widths plus an equal share of the leftover space. Re-anchor the other columns at the
        // width they are rendered at and keep only the column being resized pinned, so that the
        // drag keeps tracking the pointer instead of jumping by the redistributed share.
        if (strategy === 'even' && state.columnWidthState.every(col => resizedColumns.has(col.columnId))) {
          for (const col of state.columnWidthState) {
            if (col.columnId !== columnId) {
              newColumnWidthState = setColumnProperty(newColumnWidthState, col.columnId, 'idealWidth', col.width);
            }
          }
          resizedColumns = new Set([columnId]);
        }

        // Adjust the widths to the container size
        newColumnWidthState = autoFit(newColumnWidthState, containerWidth, resizedColumns);

        return { ...state, columnWidthState: newColumnWidthState, resizedColumns };
    }
  };

/**
 * Drops the columns that are no longer rendered from the set of deliberately resized columns.
 * Returns the original set when every resized column is still present, so that the reducer state
 * keeps its identity.
 */
function keepResizedColumns<T>(
  resizedColumns: ReadonlySet<TableColumnId>,
  columns: TableColumnDefinition<T>[],
): ReadonlySet<TableColumnId> {
  const remaining = [...resizedColumns].filter(columnId => columns.some(column => column.columnId === columnId));

  return remaining.length === resizedColumns.size ? resizedColumns : new Set(remaining);
}

export function useTableColumnResizeState<T>(
  columns: TableColumnDefinition<T>[],
  containerWidth: number,
  params: UseTableColumnSizingParams = {},
): ColumnResizeState {
  const { onColumnResize, columnSizingOptions, autoFitColumns = true, autoFitColumnsStrategy = 'last-column' } = params;

  const reducer = React.useMemo(
    () => createReducer<T>(autoFitColumns, autoFitColumnsStrategy),
    [autoFitColumns, autoFitColumnsStrategy],
  );

  const [state, dispatch] = React.useReducer(reducer, {
    columns,
    containerWidth: 0,
    columnWidthState: columnDefinitionsToState(columns, undefined, columnSizingOptions),
    columnSizingOptions,
    resizedColumns: new Set<TableColumnId>(),
  });

  useIsomorphicLayoutEffect(() => {
    // The reducer captures autoFitColumns and the strategy, so when they change the widths have
    // to be recomputed for the same container as well.
    dispatch({ type: 'CONTAINER_WIDTH_UPDATED', containerWidth });
  }, [containerWidth, autoFitColumns, autoFitColumnsStrategy]);

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'COLUMNS_UPDATED', columns });
  }, [columns]);

  useIsomorphicLayoutEffect(() => {
    dispatch({ type: 'COLUMN_SIZING_OPTIONS_UPDATED', columnSizingOptions });
  }, [columnSizingOptions]);

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
