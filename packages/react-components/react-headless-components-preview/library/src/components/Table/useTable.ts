'use client';

import type * as React from 'react';
import { useTableBase_unstable, useTableContextValues_unstable } from '@fluentui/react-table';

import type { TableProps, TableState, TableContextValues } from './Table.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a Table component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTable`.
 */
export const useTable = (props: TableProps, ref: React.Ref<HTMLElement>): TableState => {
  const state: TableState = useTableBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sortable'] = toDataAttributeValue(state.sortable);

  return state;
};

/**
 * Maps the state of the Table to the values that are passed through context to its children.
 */
export const useTableContextValues = useTableContextValues_unstable as (state: TableState) => TableContextValues;
