import * as React from 'react';
import type { DataGridRowProps, DataGridRowState } from '@fluentui/react-table';
import { useDataGridRow_unstable as useBaseState } from '@fluentui/react-table';
import { useTableRowIndexContext } from '../../contexts/rowIndexContext';

/**
 * Create the state required to render DataGridRow.
 *
 * The returned state can be modified with hooks such as useDataGridRowStyles_unstable,
 * before being passed to renderDataGridRow_unstable.
 *
 * @param props - props from this instance of DataGridRow
 * @param ref - reference to root HTMLElement of DataGridRow
 */
export const useDataGridRow_unstable = (props: DataGridRowProps, ref: React.Ref<HTMLElement>): DataGridRowState => {
  const rowIndex = useTableRowIndexContext();
  return useBaseState({ ...props, 'aria-rowindex': rowIndex }, ref);
};
