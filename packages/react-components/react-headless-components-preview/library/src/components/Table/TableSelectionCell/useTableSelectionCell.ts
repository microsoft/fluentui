'use client';

import type * as React from 'react';
import { useTableSelectionCellBase_unstable } from '@fluentui/react-table';

import type { TableSelectionCellProps, TableSelectionCellState } from './TableSelectionCell.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TableSelectionCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableSelectionCell`.
 */
export const useTableSelectionCell = (
  props: TableSelectionCellProps,
  ref: React.Ref<HTMLElement>,
): TableSelectionCellState => {
  const state: TableSelectionCellState = useTableSelectionCellBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = state.checked === 'mixed' ? 'mixed' : toDataAttributeValue(state.checked === true);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selection-type'] = state.type;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-invisible'] = toDataAttributeValue(state.hidden);

  return state;
};
