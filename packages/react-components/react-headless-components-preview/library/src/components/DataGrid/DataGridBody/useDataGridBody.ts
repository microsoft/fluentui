'use client';

import type * as React from 'react';
import { useDataGridBody_unstable } from '@fluentui/react-table';

import type { DataGridBodyProps, DataGridBodyState } from './DataGridBody.types';

/**
 * Returns the state for a DataGridBody component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridBody`.
 */
export const useDataGridBody = (props: DataGridBodyProps, ref: React.Ref<HTMLElement>): DataGridBodyState =>
  useDataGridBody_unstable(props, ref);
