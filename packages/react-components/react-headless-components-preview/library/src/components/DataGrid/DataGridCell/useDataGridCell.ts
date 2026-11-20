'use client';

import type * as React from 'react';
import { useDataGridContext_unstable, useDataGridCellBase_unstable } from '@fluentui/react-table';

import type { DataGridCellProps, DataGridCellState } from './DataGridCell.types';

/**
 * Returns the state for a DataGridCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridCell`.
 */
export const useDataGridCell = (props: DataGridCellProps, ref: React.Ref<HTMLElement>): DataGridCellState => {
  const state: DataGridCellState = useDataGridCellBase_unstable(props, ref);
  const rowFocusMode = useDataGridContext_unstable(ctx => ctx.focusMode === 'row_unstable');

  if (rowFocusMode) {
    // The cell content is part of the tab order, only the rows are part of the focusgroup.
    // eslint-disable-next-line react-hooks/immutability
    state.root.focusgroup = 'none';
  }

  return state;
};
