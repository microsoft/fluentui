'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useDataGridRowBase_unstable } from '@fluentui/react-table';

import type { DataGridRowProps, DataGridRowState } from './DataGridRow.types';
import { DataGridSelectionCell } from '../DataGridSelectionCell';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a DataGridRow component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderDataGridRow`.
 *
 * When row selection is enabled on the DataGrid, the row renders a `DataGridSelectionCell` before its cells.
 */
export const useDataGridRow = (props: DataGridRowProps, ref: React.Ref<HTMLElement>): DataGridRowState => {
  const { selectionCell, ...baseProps } = props;
  const baseState = useDataGridRowBase_unstable(baseProps, ref);

  const state: DataGridRowState = {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      selectionCell: DataGridSelectionCell,
    },
    selectionCell: slot.optional(selectionCell, {
      renderByDefault: baseState.selectable,
      elementType: DataGridSelectionCell,
    }),
  };

  state.root['data-selected'] = toDataAttributeValue(state.selectable && state.selected && !state.isHeaderRow);
  state.root['data-header-row'] = toDataAttributeValue(state.isHeaderRow);

  return state;
};
