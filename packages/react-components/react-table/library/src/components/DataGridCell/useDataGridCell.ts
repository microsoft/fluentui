'use client';

import type * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import type {
  DataGridCellBaseProps,
  DataGridCellBaseState,
  DataGridCellProps,
  DataGridCellState,
} from './DataGridCell.types';
import { useTableCell_unstable, useTableCellBase_unstable } from '../TableCell/useTableCell';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { useColumnIdContext } from '../../contexts/columnIdContext';

/**
 * Create the state required to render DataGridCell.
 *
 * The returned state can be modified with hooks such as useDataGridCellStyles_unstable,
 * before being passed to renderDataGridCell_unstable.
 *
 * @param props - props from this instance of DataGridCell
 * @param ref - reference to root HTMLElement of DataGridCell
 */
export const useDataGridCell_unstable = (props: DataGridCellProps, ref: React.Ref<HTMLElement>): DataGridCellState => {
  const { focusMode = 'cell' } = props;
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  return useTableCell_unstable(
    useDataGridCellProps(props, focusMode === 'group' ? focusableGroupAttr : undefined),
    ref,
  );
};

/**
 * Base state hook for DataGridCell, free of Tabster.
 *
 * @param props - props from this instance of DataGridCell
 * @param ref - reference to root HTMLElement of DataGridCell
 */
export const useDataGridCellBase_unstable = (
  props: DataGridCellBaseProps,
  ref: React.Ref<HTMLElement>,
): DataGridCellBaseState => {
  return useTableCellBase_unstable(useDataGridCellProps(props), ref);
};

/**
 * Props of the underlying table cell, shared by the styled and the base DataGridCell hooks.
 */
function useDataGridCellProps(props: DataGridCellBaseProps, focusProps?: object) {
  const { focusMode = 'cell' } = props;
  const columnId = useColumnIdContext();
  const tabbable = useDataGridContext_unstable(
    ctx => (ctx.focusMode === 'cell' || ctx.focusMode === 'composite') && focusMode !== 'none',
  );
  const resizableColumns = useDataGridContext_unstable(ctx => ctx.resizableColumns);
  const getTableCellProps = useDataGridContext_unstable(ctx => {
    return ctx.columnSizing_unstable.getTableCellProps;
  });

  return {
    as: 'div' as const,
    role: 'gridcell',
    ...focusProps,
    tabIndex: tabbable ? 0 : undefined,
    ...(resizableColumns ? getTableCellProps(columnId) : {}),
    ...props,
  };
}
