'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTableResizeHandle_unstable } from '../components/TableResizeHandle/useTableResizeHandle';
import { renderTableResizeHandle_unstable } from '../components/TableResizeHandle/renderTableResizeHandle';
import type { TableResizeHandleProps } from '../components/TableResizeHandle/TableResizeHandle.types';
import { findPrevFocusable } from '../utils/dataGridDomNavigation';
import type {
  ColumnResizeState,
  ColumnWidthState,
  EnableKeyboardModeOnChangeCallback,
  TableColumnId,
  TableFeaturesState,
  UseTableColumnSizingParams,
} from './types';

import { useMeasureElement } from './useMeasureElement';
import { useTableColumnResizeMouseHandler } from './useTableColumnResizeMouseHandler';
import { useTableColumnResizeState } from './useTableColumnResizeState';
import type { KeyboardResizing } from './useKeyboardResizingBase';
import { useKeyboardResizingBase } from './useKeyboardResizingBase';

/**
 * Resize handle without styles, rendered by the base column sizing plugin.
 */
const TableResizeHandleBase: ForwardRefComponent<TableResizeHandleProps> = React.forwardRef((props, ref) =>
  renderTableResizeHandle_unstable(useTableResizeHandle_unstable(props, ref)),
);

TableResizeHandleBase.displayName = 'TableResizeHandleBase';

/**
 * Column sizing plugin for `useTableFeatures`, free of Tabster and of styles. The resize handle is rendered without
 * styles and the focus is moved with plain DOM queries when the keyboard resizing mode ends.
 */
export function useTableColumnSizingBase<TItem>(params?: UseTableColumnSizingParams) {
  // False positive, these plugin hooks are intended to be run on every render

  return (tableState: TableFeaturesState<TItem>): TableFeaturesState<TItem> =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTableColumnSizingBaseState(tableState, { autoFitColumns: true, ...params });
}

function useTableColumnSizingBaseState<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnSizingParams,
): TableFeaturesState<TItem> {
  const columnResize = useColumnResize(tableState, params);
  // Creates the keyboard handler for resizing columns
  const keyboardResizing = useKeyboardResizingBase(columnResize.columnResizeState, findPrevFocusable);

  return useColumnSizingFeature(tableState, params, columnResize, keyboardResizing, TableResizeHandleBase);
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

type ColumnResize = {
  measureElementRef: (el: HTMLElement | null) => void;
  columnResizeState: ColumnResizeState;
};

/**
 * Measures the container and creates the column widths state based on it.
 */
export function useColumnResize<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnSizingParams,
): ColumnResize {
  // Gets the container width
  const { width, measureElementRef } = useMeasureElement();
  // Creates the state based on columns and available containerWidth
  const columnResizeState = useTableColumnResizeState(
    tableState.columns,
    width + (params.containerWidthOffset || 0),
    params,
  );

  return { measureElementRef, columnResizeState };
}

/**
 * Column sizing feature state shared by the styled and the base plugins, which provide the keyboard resizing and the
 * resize handle component.
 */
export function useColumnSizingFeature<TItem>(
  tableState: TableFeaturesState<TItem>,
  params: UseTableColumnSizingParams,
  { measureElementRef, columnResizeState }: ColumnResize,
  { toggleInteractiveMode, getKeyboardResizingProps }: KeyboardResizing,
  ResizeHandle: React.ComponentType<TableResizeHandleProps>,
): TableFeaturesState<TItem> {
  const { columns } = tableState;
  // Creates the mouse handler and attaches the state to it
  const mouseHandler = useTableColumnResizeMouseHandler(columnResizeState);

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
              <ResizeHandle
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
        [getColumnById, columns, dragging, getKeyboardResizingProps, getOnMouseDown, autoFitColumns, ResizeHandle],
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
