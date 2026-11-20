'use client';

import type * as React from 'react';
import { useTableHeader_unstable } from '@fluentui/react-table';

import type { TableHeaderProps, TableHeaderState } from './TableHeader.types';

/**
 * Returns the state for a TableHeader component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableHeader`.
 */
export const useTableHeader = (props: TableHeaderProps, ref: React.Ref<HTMLElement>): TableHeaderState => {
  return useTableHeader_unstable(props, ref);
};
