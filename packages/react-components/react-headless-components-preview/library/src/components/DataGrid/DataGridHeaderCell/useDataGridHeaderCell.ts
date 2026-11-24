'use client';

import type * as React from 'react';
import { useDataGridContext_unstable, useDataGridHeaderCellBase_unstable } from '@fluentui/react-table';

import type { DataGridHeaderCellProps, DataGridHeaderCellState } from './DataGridHeaderCell.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a DataGridHeaderCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridHeaderCell`.
 */
export const useDataGridHeaderCell = (
  props: DataGridHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): DataGridHeaderCellState => {
  const state: DataGridHeaderCellState = useDataGridHeaderCellBase_unstable(props, ref);
  const rowFocusMode = useDataGridContext_unstable(ctx => ctx.focusMode === 'row_unstable');

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sortable'] = toDataAttributeValue(state.sortable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sort-direction'] = state.sortable ? state.sortDirection : undefined;

  if (rowFocusMode) {
    // The cell content is part of the tab order, only the rows are part of the focusgroup.
    // eslint-disable-next-line react-hooks/immutability
    state.root.focusgroup = 'none';
  }

  return state;
};
