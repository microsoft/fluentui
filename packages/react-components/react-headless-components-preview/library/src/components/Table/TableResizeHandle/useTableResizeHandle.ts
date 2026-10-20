'use client';

import type * as React from 'react';
import { useTableResizeHandle_unstable } from '@fluentui/react-table';

import type { TableResizeHandleProps, TableResizeHandleState } from './TableResizeHandle.types';

/**
 * Returns the state for a TableResizeHandle component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTableResizeHandle`.
 */
export const useTableResizeHandle = (
  props: TableResizeHandleProps,
  ref: React.Ref<HTMLElement>,
): TableResizeHandleState => {
  return useTableResizeHandle_unstable(props, ref);
};
