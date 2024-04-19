import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import type { DataGridCellProps, DataGridCellState } from './DataGridCell.types';
import { useTableCell_unstable } from '../TableCell/useTableCell';
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
  const columnId = useColumnIdContext();
  const tabbable = useDataGridContext_unstable(
    ctx => (ctx.focusMode === 'cell' || ctx.focusMode === 'composite') && focusMode !== 'none',
  );
  const resizableColumns = useDataGridContext_unstable(ctx => ctx.resizableColumns);
  const getTableCellProps = useDataGridContext_unstable(ctx => {
    return ctx.columnSizing_unstable.getTableCellProps;
  });
  const focusableGroupAttr = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });
  return useTableCell_unstable(
    {
      as: 'div',
      role: 'gridcell',
      ...(focusMode === 'group' && focusableGroupAttr),
      tabIndex: tabbable ? 0 : undefined,
      ...(resizableColumns ? getTableCellProps(columnId) : {}),
      ...props,
    },
    ref,
  );
};
