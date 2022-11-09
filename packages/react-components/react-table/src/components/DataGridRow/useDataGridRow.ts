import * as React from 'react';
import type { DataGridRowProps, DataGridRowState } from './DataGridRow.types';
import { useTableRow_unstable } from '../TableRow/useTableRow';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';

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
  const columnDefs = useDataGridContext_unstable(ctx => ctx.columns);

  const cellRenderFunction = props.children;
  const children = columnDefs.map(columnDef => {
    return cellRenderFunction(columnDef);
  });

  return useTableRow_unstable({ ...props, children, as: 'div' }, ref);
};
