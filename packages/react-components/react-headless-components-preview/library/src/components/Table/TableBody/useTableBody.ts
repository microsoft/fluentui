'use client';

import type * as React from 'react';
import { useTableBody_unstable } from '@fluentui/react-table';

import type { TableBodyProps, TableBodyState } from './TableBody.types';

/**
 * Returns the state for a TableBody component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableBody`.
 */
export const useTableBody = (props: TableBodyProps, ref: React.Ref<HTMLElement>): TableBodyState => {
  return useTableBody_unstable(props, ref);
};
