import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import type { DataGridProps, DataGridState } from './DataGrid.types';
import { useTable_unstable } from '../Table/useTable';
import { useTable } from '../../hooks/useTable';

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
  const { items, columns, focusMode = 'none' } = props;
  const navigable = focusMode !== 'none';
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });
  const tableState = useTable({ items, columns }, []);
  const baseTableState = useTable_unstable(
    { role: 'grid', as: 'div', ...(navigable && keyboardNavAttr), ...props },
    ref,
  );

  return {
    ...baseTableState,
    focusMode,
    tableState,
  };
};
