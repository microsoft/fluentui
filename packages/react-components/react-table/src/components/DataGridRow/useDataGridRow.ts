import * as React from 'react';
import type { DataGridRowProps, DataGridRowState } from './DataGridRow.types';
import { useTableRow_unstable } from '../TableRow/useTableRow';
import { useDataGridContext_unstable } from '../../contexts/dataGridContext';
import { ColumnDefinitionRender } from '../../hooks/types';

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
  // Use any here since we can't know the user types
  // The user is responsible for narrowing the type downstream
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnDefsRendered: ColumnDefinitionRender<any>[] = columnDefs.map(columnDef => {
    return {
      ...columnDef,
      renderCell: columnDef.renderCell ?? (() => null),
      renderHeader: columnDef.renderHeader ?? (() => null),
    };
  });

  const cellRenderFunction = props.children;
  const children = columnDefsRendered.map(columnDefRendered => {
    return cellRenderFunction(columnDefRendered);
  });

  return useTableRow_unstable({ ...props, children, as: 'div' }, ref);
};
