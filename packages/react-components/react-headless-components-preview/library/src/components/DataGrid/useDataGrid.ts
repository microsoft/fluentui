'use client';

import type * as React from 'react';
import { useDataGridBase_unstable, useDataGridContextValues_unstable } from '@fluentui/react-table';

import type { DataGridContextValues, DataGridProps, DataGridState } from './DataGrid.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a DataGrid component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGrid`.
 *
 * Arrow key navigation uses the `focusgroup` attribute. Browsers without native support need a polyfill.
 * The keys that `focusgroup` does not cover (up and down in the `cell` focus mode, `Home`, `End`, `Ctrl+Home`
 * and `Ctrl+End`) are handled by the base hook with plain DOM queries.
 */
export const useDataGrid = (props: DataGridProps, ref: React.Ref<HTMLElement>): DataGridState => {
  const state: DataGridState = useDataGridBase_unstable(props, ref) as DataGridState;

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup =
    state.focusMode === 'cell' ? 'toolbar inline' : state.focusMode === 'row_unstable' ? 'toolbar block' : undefined;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-sortable'] = toDataAttributeValue(state.sortable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-focus-mode'] = state.focusMode;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selection-mode'] = state.selectableRows ? state.tableState.selection.selectionMode : undefined;

  return state;
};

/**
 * Returns the context of the data grid, which exposes its items, columns, sort and selection state.
 */
export { useDataGridContext_unstable as useDataGridContext } from '@fluentui/react-table';

/**
 * Maps the state of the data grid to the values that are passed through context to its children.
 */
export const useDataGridContextValues = useDataGridContextValues_unstable as (
  state: DataGridState,
) => DataGridContextValues;
