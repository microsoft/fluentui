'use client';

import type * as React from 'react';
import { useDataGridContext_unstable, useDataGridSelectionCellBase_unstable } from '@fluentui/react-table';

import type { DataGridSelectionCellProps, DataGridSelectionCellState } from './DataGridSelectionCell.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a DataGridSelectionCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridSelectionCell`.
 *
 * The selection indicator is a native input. Give it an accessible name with `checkboxIndicator` or `radioIndicator`.
 */
export const useDataGridSelectionCell = (
  props: DataGridSelectionCellProps,
  ref: React.Ref<HTMLElement>,
): DataGridSelectionCellState => {
  const state: DataGridSelectionCellState = useDataGridSelectionCellBase_unstable(props, ref);
  const rowFocusMode = useDataGridContext_unstable(ctx => ctx.focusMode === 'row_unstable');

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = state.checked === 'mixed' ? 'mixed' : toDataAttributeValue(state.checked === true);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selection-type'] = state.type;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invisible'] = toDataAttributeValue(state.hidden);
  if (rowFocusMode) {
    // eslint-disable-next-line react-hooks/immutability
    state.root.focusgroup = 'none';
  }

  return state;
};
