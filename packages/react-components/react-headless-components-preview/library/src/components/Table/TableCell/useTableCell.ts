'use client';

import type * as React from 'react';
import { useTableCellBase_unstable } from '@fluentui/react-table';

import type { TableCellProps, TableCellState } from './TableCell.types';

/**
 * Returns the state for a TableCell component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableCell`.
 */
export const useTableCell = (props: TableCellProps, ref: React.Ref<HTMLElement>): TableCellState => {
  return useTableCellBase_unstable(props, ref);
};
