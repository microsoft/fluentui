'use client';

import type * as React from 'react';
import { useDataGridHeader_unstable } from '@fluentui/react-table';

import type { DataGridHeaderProps, DataGridHeaderState } from './DataGridHeader.types';

/**
 * Returns the state for a DataGridHeader component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridHeader`.
 */
export const useDataGridHeader = (props: DataGridHeaderProps, ref: React.Ref<HTMLElement>): DataGridHeaderState =>
  useDataGridHeader_unstable(props, ref);
