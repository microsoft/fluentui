'use client';

import type * as React from 'react';
import { useTableCellActions_unstable } from '@fluentui/react-table';

import type { TableCellActionsProps, TableCellActionsState } from './TableCellActions.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TableCellActions component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableCellActions`.
 */
export const useTableCellActions = (
  props: TableCellActionsProps,
  ref: React.Ref<HTMLElement>,
): TableCellActionsState => {
  const state: TableCellActionsState = useTableCellActions_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-visible'] = toDataAttributeValue(state.visible);

  return state;
};
