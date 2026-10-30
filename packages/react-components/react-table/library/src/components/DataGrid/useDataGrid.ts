'use client';

import * as React from 'react';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import type { DataGridBaseProps, DataGridBaseState, DataGridProps, DataGridState } from './DataGrid.types';
import { useTableBase_unstable } from '../Table/useTable';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { End, Home } from '@fluentui/keyboard-keys';
import {
  useTableFeatures,
  useTableSort,
  useTableSelection,
  useTableColumnSizing_unstable,
  useTableCompositeNavigation,
} from '../../hooks';
import { useTableColumnSizingBase } from '../../hooks/useColumnSizingFeature';
import { CELL_WIDTH } from '../TableSelectionCell';
import { handleDataGridKeyDown } from '../../utils/dataGridDomNavigation';

/**
 * Create the state required to render DataGrid.
 *
 * The returned state can be modified with hooks such as useDataGridStyles_unstable,
 * before being passed to renderDataGrid_unstable.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGrid_unstable = (props: DataGridProps, ref: React.Ref<HTMLElement>): DataGridState => {
  const { focusMode = 'cell', subtleSelection = false, selectionAppearance = 'brand' } = props;

  const gridTabsterAttribute = useArrowNavigationGroup({
    axis: 'grid',
  });

  const {
    onTableKeyDown: onCompositeKeyDown,
    tableTabsterAttribute: compositeTabsterAttribute,
    tableRowTabsterAttribute: compositeRowTabsterAttribute,
  } = useTableCompositeNavigation();

  const { findFirstFocusable, findLastFocusable } = useFocusFinders();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>, grid: HTMLElement | null) => {
    focusMode === 'composite' && onCompositeKeyDown(e);

    // handle ctrl+home and ctrl+end
    if (!grid || !e.ctrlKey || e.defaultPrevented) {
      return;
    }

    if (e.key === Home) {
      const firstRow = grid.querySelector('[role="row"]') as HTMLElement | null;
      if (firstRow) {
        findFirstFocusable(firstRow)?.focus();
      }
    }

    if (e.key === End) {
      const rows = grid.querySelectorAll('[role="row"]');
      if (rows.length) {
        const lastRow = rows.item(rows.length - 1);
        findLastFocusable(lastRow as HTMLElement)?.focus();
      }
    }
  };

  const baseState = useDataGridState(
    props,
    ref,
    useTableColumnSizing_unstable,
    {
      ...(focusMode === 'cell' && gridTabsterAttribute),
      ...(focusMode === 'composite' && compositeTabsterAttribute),
    },
    handleKeyDown,
  );

  return {
    ...baseState,
    size: props.size ?? 'medium',
    subtleSelection,
    selectionAppearance,
    compositeRowTabsterAttribute,
  };
};

/**
 * Base state hook for DataGrid, free of Tabster and of design props (`size`, `subtleSelection`, `selectionAppearance`).
 *
 * Focus management is left to the caller, for example with the `focusgroup` attribute. The hook handles the keyboard
 * interactions that such an attribute does not cover with plain DOM queries: the up and down arrow keys move to the
 * cell in the same column of the adjacent row, `Home` and `End` move to the first and last cell of the row and
 * `Ctrl+Home` and `Ctrl+End` move to the first and last focusable element of the grid.
 *
 * @param props - props from this instance of DataGrid
 * @param ref - reference to root HTMLElement of DataGrid
 */
export const useDataGridBase_unstable = (props: DataGridBaseProps, ref: React.Ref<HTMLElement>): DataGridBaseState => {
  const { focusMode = 'cell' } = props;

  const cellNavigation = focusMode === 'cell';

  return useDataGridState(
    props,
    ref,
    useTableColumnSizingBase,
    {},
    (e, grid) => {
      if (grid) {
        handleDataGridKeyDown(e, grid, { cellNavigation, phase: 'bubble' });
      }
    },
    (e, grid) => {
      if (grid) {
        handleDataGridKeyDown(e, grid, { cellNavigation, phase: 'capture' });
      }
    },
  );
};

type DataGridKeyDownHandler = (e: React.KeyboardEvent<HTMLTableElement>, grid: HTMLElement | null) => void;

/**
 * Shared implementation of the DataGrid state. The focus handling and the column sizing plugin are provided by the
 * caller: the Tabster based attributes, key handling and styled resize handles for the styled DataGrid, plain DOM key
 * handling and unstyled resize handles for the base hook. The capture handler is only provided by the base hook.
 */
const useDataGridState = (
  props: DataGridBaseProps,
  ref: React.Ref<HTMLElement>,
  columnSizingPlugin: typeof useTableColumnSizing_unstable,
  focusProps: Record<string, unknown>,
  handleKeyDown: DataGridKeyDownHandler,
  handleKeyDownCapture?: DataGridKeyDownHandler,
): DataGridBaseState => {
  const {
    items,
    columns,
    focusMode = 'cell',
    selectionMode,
    onSortChange,
    onSelectionChange,
    defaultSortState,
    sortState,
    selectedItems,
    defaultSelectedItems,
    getRowId,
    resizableColumns,
    columnSizingOptions,
    onColumnResize,
    containerWidthOffset,
    resizableColumnsOptions = {},
  } = props;

  const widthOffset = containerWidthOffset ?? (selectionMode ? -CELL_WIDTH : 0);

  const tableState = useTableFeatures({ items, columns, getRowId }, [
    useTableSort({
      defaultSortState,
      sortState,
      onSortChange,
    }),
    useTableSelection({
      defaultSelectedItems,
      selectedItems,
      onSelectionChange,
      selectionMode: selectionMode ?? 'multiselect',
    }),
    columnSizingPlugin({
      onColumnResize,
      columnSizingOptions,
      // The selection cell is not part of the columns, therefore its width needs to be subtracted
      // from the container to make sure the columns don't overflow the table.
      containerWidthOffset: widthOffset,
      // Disables automatic resizing of columns when the container overflows.
      // This allows the sum of the columns to be larger than the container.
      autoFitColumns: resizableColumnsOptions.autoFitColumns ?? true,
    }),
  ]);

  const innerRef = React.useRef<HTMLDivElement>(null);
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLTableElement>) => {
    props.onKeyDown?.(e);
    handleKeyDown(e, innerRef.current);
  });

  const onKeyDownCapture = useEventCallback((e: React.KeyboardEvent<HTMLTableElement>) => {
    props.onKeyDownCapture?.(e);
    handleKeyDownCapture?.(e, innerRef.current);
  });

  const baseTableState = useTableBase_unstable(
    {
      role: 'grid',
      as: 'div',
      noNativeElements: true,
      ...focusProps,
      ...props,
      onKeyDown,
      ...(handleKeyDownCapture && { onKeyDownCapture }),
      ...(resizableColumns ? tableState.columnSizing_unstable.getTableProps(props) : {}),
    },
    useMergedRefs(ref, tableState.tableRef, innerRef),
  );

  return {
    ...baseTableState,
    focusMode,
    tableState,
    selectableRows: !!selectionMode,
    resizableColumns,
  };
};
