import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useCallback, useState } from 'react';
import { ColumnDefinition, ColumnId, ColumnResizeState, ColumnWidthState, UseColumnSizingParams } from './types';
import {
  columnDefinitionsToState,
  adjustColumnWidthsToFitContainer,
  getColumnById,
  setColumnProperty,
  getTotalWidth,
  getLastColumn,
  getColumnByIndex,
  getColumnWidth,
  getLength,
} from '../utils/columnResizeUtils';

export function useColumnResizeState<T>(
  columns: ColumnDefinition<T>[],
  containerWidth: number,
  params: UseColumnSizingParams = {},
): ColumnResizeState {
  const { onColumnResize, columnSizingOptions } = params;

  const [state, setState] = useState<ColumnWidthState[]>(
    columnDefinitionsToState(columns, undefined, columnSizingOptions),
  );

  // Use layout effect here to make sure that updated columns receive proper styles immediately
  useIsomorphicLayoutEffect(() => {
    const intermediateState = columnDefinitionsToState(columns, state, columnSizingOptions);
    setState(adjustColumnWidthsToFitContainer(intermediateState, containerWidth));
  }, [columns, containerWidth, state, columnSizingOptions]);

  const setColumnWidth = useCallback(
    (columnId: ColumnId, width: number) => {
      const column = getColumnById(state, columnId);
      let newState = [...state];

      // Return early if the new width should result in smaller than minimum
      if (!column || width < column.minWidth) {
        return;
      }

      // Adjust the column width and measure the new total width
      newState = setColumnProperty(newState, columnId, 'width', width);
      // Set this width as idealWidth, because its a deliberate change, not a recalculation because of container
      newState = setColumnProperty(newState, columnId, 'idealWidth', width);
      // Adjust the widths to the container size
      newState = adjustColumnWidthsToFitContainer(newState, containerWidth);

      onColumnResize?.(columnId, width);

      // Commit the state update
      setState(newState);
    },
    [containerWidth, state, onColumnResize],
  );

  const setColumnIdealWidth = useCallback(
    (columnId: ColumnId, minWidth: number) => {
      setState(setColumnProperty(state, columnId, 'idealWidth', minWidth));
    },
    [state],
  );

  return {
    getColumnById: (colId: ColumnId) => getColumnById(state, colId),
    getColumnByIndex: (index: number) => getColumnByIndex(state, index),
    getColumns: () => state,
    getColumnWidth: (colId: ColumnId) => getColumnWidth(state, colId),
    getLastColumn: () => getLastColumn(state),
    getLength: () => getLength(state),
    getTotalWidth: () => getTotalWidth(state),
    setColumnIdealWidth,
    setColumnWidth,
  };
}
