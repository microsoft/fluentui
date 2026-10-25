'use client';

import type * as React from 'react';
import { useTableHeaderCellBase_unstable } from '@fluentui/react-table';

import type { TableHeaderCellProps, TableHeaderCellState } from './TableHeaderCell.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TableHeaderCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableHeaderCell`.
 */
export const useTableHeaderCell = (props: TableHeaderCellProps, ref: React.Ref<HTMLElement>): TableHeaderCellState => {
  const state: TableHeaderCellState = useTableHeaderCellBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sortable'] = toDataAttributeValue(state.sortable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sort-direction'] = state.sortable ? state.sortDirection : undefined;

  return state;
};
