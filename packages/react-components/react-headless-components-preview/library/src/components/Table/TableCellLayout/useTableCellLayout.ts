'use client';

import type * as React from 'react';
import { useTableCellLayoutBase_unstable } from '@fluentui/react-table';

import type { TableCellLayoutProps, TableCellLayoutState } from './TableCellLayout.types';

/**
 * Returns the state for a TableCellLayout component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableCellLayout`.
 */
export const useTableCellLayout = (props: TableCellLayoutProps, ref: React.Ref<HTMLElement>): TableCellLayoutState => {
  return useTableCellLayoutBase_unstable(props, ref);
};
