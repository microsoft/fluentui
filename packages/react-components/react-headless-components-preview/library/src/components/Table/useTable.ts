'use client';

import type * as React from 'react';
import {
  useTableBase_unstable,
  useTableContext as useTableContextBase,
  useTableContextValues_unstable,
} from '@fluentui/react-table';

import type { TableProps, TableState, TableContextValue, TableContextValues } from './Table.types';
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

/**
 * Returns the context of the table, which tells the subcomponents whether the table is sortable and whether it renders
 * native table elements.
 */
export const useTableContext = useTableContextBase as () => TableContextValue;
