'use client';

import type * as React from 'react';
import { useTableRowBase_unstable } from '@fluentui/react-table';

import type { TableRowProps, TableRowState } from './TableRow.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TableRow component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableRow`.
 */
export const useTableRow = (props: TableRowProps, ref: React.Ref<HTMLElement>): TableRowState => {
  const state: TableRowState = useTableRowBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-header-row'] = toDataAttributeValue(state.isHeaderRow);

  return state;
};
